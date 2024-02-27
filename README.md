# Simple Real-Time Chat Application


## Technologies </> ⚙️

- Node.JS
- Express
- Socket.io
- EJS
- MongoDB Atlas
- Docker

## Features 🚀

- Real-time conversations
- Gifs
- Profanity Filter

## Getting Started ▶

### Environment Variables ⚙️
- DB_URL: Create a database in mongodb atlas and put the database link as a value for this variable. [https://www.mongodb.com/pt-br]
- API_KEY: Create a GIPHY API Key [https://developers.giphy.com/docs/api#quick-start-guide] and put the api key as a value for this variable.
- URL: Define the host to run the application, example: "http://localhost:3000"

### Running the Application ▶
- Clone the repository
- Install dependencies: 'npm i'
- Create a '.env' file as specified in the '.env.example' file and set the values for the environment variables
- Run the application with 'npm start'

### Running the Application with Docker 🐳
- docker build -t app: 1.0 .
- docker run -d -e DB_URL="put_the_database_link_here" -e API_KEY="put_the_giphy_api_key_here" -e URL=localhost:3000 -p 3000:3000 app:1.0

