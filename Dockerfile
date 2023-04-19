
FROM node:16.13.1
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . /src  
EXPOSE 8000  
CMD npm run start:dev