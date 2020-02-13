FROM node:12.14.0
MAINTAINER littledian 1197434548@qq.com

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
