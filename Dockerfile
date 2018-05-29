FROM node:4.8.7

WORKDIR /opt/minit-service/

RUN npm install -g minit@0.5.8

COPY ./package.json ./
RUN npm install --production
COPY . .

ENTRYPOINT ["node", "index.js"]
