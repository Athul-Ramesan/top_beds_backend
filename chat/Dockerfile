FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g typescript

COPY . .

RUN npm run build

EXPOSE 3004

CMD [ "npm", "start" ]