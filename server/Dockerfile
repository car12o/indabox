FROM node:11.8-alpine
WORKDIR /home/server
RUN apk add git
COPY . .
RUN npm i
CMD npm run start
