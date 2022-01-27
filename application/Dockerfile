FROM node:17

WORKDIR /app

RUN npm install redis@3.1.2

COPY ./server/index.js ./
COPY ./client/index.html ./

CMD ["node","index.js"]
