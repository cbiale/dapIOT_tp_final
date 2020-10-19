FROM node:12.18.0
WORKDIR /usr/src/app
COPY rollup.config.js ./
COPY package*.json ./
RUN npm install
COPY ./src ./src
COPY ./public ./public
RUN npm run-script build
EXPOSE 5000
ENV  NODE_ENV production
ENV HOST=0.0.0.0
CMD [ "npm", "start" ]
