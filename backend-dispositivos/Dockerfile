FROM node:10.19.0
WORKDIR /home/nodejs/app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 3001
ENV  NODE_ENV production
CMD ["node", "index.js"]