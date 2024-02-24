FROM node:20.11.1-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

ENV DB_URL=
ENV API_KEY=
ENV URL=


EXPOSE 3000

CMD ["npm", "start"]
