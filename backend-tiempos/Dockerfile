FROM node:10.19.0
WORKDIR /home/nodejs/app
COPY package.json .
RUN npm install --production
COPY . .
RUN apt-get update && apt-get install --assume-yes libuv1-dev
RUN git clone https://github.com/transceptor-technology/libqpack.git
RUN cd ./libqpack/Release && make all &&  make install
RUN git clone https://github.com/SiriDB/libsiridb.git
RUN cd ./libsiridb/Release && make all &&  make install
RUN git clone https://github.com/SiriDB/libsuv.git
RUN cd ./libsuv/Release && make all &&  make install
# RUN npm install -g node-gyp
# RUN git clone https://github.com/SiriDB/siridb-nodejs-addon
# RUN cd ./siridb-nodejs-addon && node-gyp configure && node-gyp build
EXPOSE 3000
ENV  NODE_ENV production
CMD ["node", "index.js"]