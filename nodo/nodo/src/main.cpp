#include <Arduino.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <DHTesp.h>
#include <ArduinoJson.h>

// Dispositivos
const int LED                    = 32;
const int DHT22_PIN              = 23;
// Dispositivo ID
const String DISPOSITIVO_ID      = "1";
// Wifi
const String WIFI_SSID           = "Pippe";
const String WIFI_CLAVE          = "carolina0304";
// Mqtt
const String MQTT_SERVIDOR       = "192.168.0.10";
const int    MQTT_PUERTO         = 1883;
// topicos
const String TOPICO_SENSORES     = DISPOSITIVO_ID + "/sensores";
const String TOPICO_ACTUADOR     = DISPOSITIVO_ID + "/actuador";

// LED
static uint32_t estadoLed = 0;
// DHT22
DHTesp dht;
// cliente Wifi
WiFiClient clienteWifi;
// cliente MQTT
PubSubClient clienteMqtt (clienteWifi);


// cabeceras
int activarLed (uint8_t led);
int desactivarLed (uint8_t led);
void iniciarWifi ();
void conectarMQTT();
void publicarMqtt (String topico, String valor);
void subscribirMqtt (char* topico, byte* valor, unsigned int largo);

// activa el led
int activarLed (uint8_t led){
    digitalWrite(led, true);
    return 1;
}

// desactiva el led
int desactivarLed (uint8_t led){
    digitalWrite(led, false);
    return 0;
}

// inicia WIFI
void iniciarWifi () {
    Serial.print("Conectándose a: ");
    Serial.println(WIFI_SSID);
    // conexión
    WiFi.begin(WIFI_SSID.c_str(), WIFI_CLAVE.c_str());
    // espero que se establezca la conexión  
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    // imprimo datos de la conexión
    Serial.print("WiFi conectado, dirección IP:");
    Serial.println(WiFi.localIP());
}

// conexión al broker MQTT
void conectarMQTT(){
    // bucle hasta realizar la conexión
    while (! clienteMqtt.connected()) {
        Serial.print("Iniciando conexión Mqtt...");
        // prueba conexión
        if (clienteMqtt.connect(DISPOSITIVO_ID.c_str())) {
            Serial.println("conectado!!");
            // Subscribo a un tópico
            clienteMqtt.subscribe(TOPICO_ACTUADOR.c_str());
        } else {
            Serial.print("fallo, rc = ");
            Serial.print(clienteMqtt.state());
            Serial.println(". Reintentando...");
            // 5 segundos
            delay(5000);
        }
    }
}


void publicarMqtt (String topico, String valor){
    Serial.print("Enviando por MQTT: ");
    Serial.print(topico);
    Serial.print(" con ");
    Serial.println(valor);
    // publica mensaje
    clienteMqtt.publish( topico.c_str(), valor.c_str(), true );
}

void subscribirMqtt (char* topico, byte* valor, unsigned int largo){
    if (strcmp(topico, TOPICO_ACTUADOR.c_str()) == 0){
        // agrega el caracter nulo
        valor[largo] = '\0';
        // string -> int
        uint32_t recibido = atoi((const char *) valor);

        if (recibido >= 0 && recibido <= 1){
            Serial.println("Cambiar estado led");
            Serial.println((const char *) valor);
            // cambio estado
            if (recibido == 0) {
                desactivarLed(LED);
                estadoLed = 0;
            } else {
              activarLed(LED);
              estadoLed = 1;
            }
            Serial.println(estadoLed);
        } else {
            Serial.println("Valor erroneo.");
        }
    } else {
        Serial.println("Topico incorrecto");
    }
}

void appInicio() {
  delay(3000);
  Serial.begin(9600);
  // dht
  dht.setup(DHT22_PIN, DHTesp::DHT22);

  // puerto como salida
  pinMode(LED, OUTPUT);
  // servidor mqtt
  clienteMqtt.setServer(MQTT_SERVIDOR.c_str(), MQTT_PUERTO);
  // configuro por espera de tópicos
  clienteMqtt.setCallback(subscribirMqtt);
  // inicio wifi
  iniciarWifi();
  // led apagado
  digitalWrite(LED, false);
  estadoLed = 0;
  // aleatorios
  randomSeed(analogRead(0));
}

void appLoop() {
  static uint32_t contador = 0;
  // controla si se encuentra conectado al brocker
  if (! clienteMqtt.connected()) {
      // si no se conecto al brocker lo hace
      conectarMQTT();
  }
  // espero por nuevos mensajes
  clienteMqtt.loop();
  if (++contador > 500000){
    contador = 0;
    // valores de sensores
    TempAndHumidity valoresSensores = dht.getTempAndHumidity();
    Serial.println("Temperatura: " + String(valoresSensores.temperature, 0) );
    Serial.println("Humedad: " + String(valoresSensores.humidity, 0) );
    Serial.print("Estado Led: ");
    Serial.println(estadoLed );
    // invento valores dado que no pude hacer funcionar la placa
    int temporalTemperatura = random(20, 40);
    int temporalHumedad = random(30, 101);
    String valores = String(" { \"temperatura\": ") + String(temporalTemperatura);
    valores = valores + String(", \"humedad\": ") + String(temporalHumedad) + String("}"); 
    publicarMqtt(TOPICO_SENSORES, valores);
    String mensajeLed = String("" + estadoLed);
    publicarMqtt(TOPICO_ACTUADOR, mensajeLed);
  }

}

void setup() {
  appInicio();
}

void loop() {
  appLoop();
}