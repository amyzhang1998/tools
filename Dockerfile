FROM node:12.14.0
MAINTAINER littledian 1197434548@qq.com
ENV SASS_BINARY_SITE http://npm.taobao.org/mirrors/node-sass

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
