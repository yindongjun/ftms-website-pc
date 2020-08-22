FROM node:11.15-alpine as builder
MAINTAINER Azleal

COPY ./ /root/project

WORKDIR /root/project

RUN npm install 
RUN npm run build

FROM nginx:1.14-alpine
COPY --from=builder /root/project/build /usr/share/nginx/html

EXPOSE 80

