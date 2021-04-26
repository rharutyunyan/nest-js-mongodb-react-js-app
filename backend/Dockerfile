FROM node:12-alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . /src
CMD npm start
EXPOSE 5000
