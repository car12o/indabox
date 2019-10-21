FROM node:11.8-alpine as builder
WORKDIR /home/indabox-client
RUN apk add git
COPY . .
RUN npm i
ARG REACT_APP_API_URL
RUN REACT_APP_API_URL=${REACT_APP_API_URL} npm run build

FROM nginx:1.17.4-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=builder /home/indabox-client/build /usr/share/nginx/html
