FROM node:8
EXPOSE 8080
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm run dev
EXPOSE 8080
