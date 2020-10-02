FROM node:14.11.0
RUN groupadd -r nodejs && useradd -m -r -g -s /bin/bash nodejs nodejs
USER nodejs
WORKDIR /home/nodejs/app
COPY package.json .
RUN npm install --production
COPY . .
ENV  NODE_ENV production
CMD [“node”, “index.js”]