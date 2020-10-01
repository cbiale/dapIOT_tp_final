FROM grafana/grafana:7.2.0
USER root
RUN apk --update add git less openssh 
RUN rm -rf /var/lib/apt/lists/*
RUN rm /var/cache/apk/*
RUN cd /var/lib/grafana/plugins/ 
RUN git clone https://github.com/SiriDB/grafana-siridb-http-datasource.git
