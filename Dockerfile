FROM node:18-alpine3.16

WORKDIR /app

COPY . .

RUN npm install

LABEL description="This image service makes a conexion between the UI and data base of meetings, and generate autentication tokens"

CMD ["npm", "start"]