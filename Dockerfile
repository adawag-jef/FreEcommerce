FROM node:10.15.1

ENV HOST 0.0.0.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN cd ./client && npm install && npm run build

EXPOSE 5000

CMD ["npm", "start"]
