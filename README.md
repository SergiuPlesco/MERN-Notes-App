# MERN-Notes-App
* Create, read, update, delete simple notes.
* Register/Log in/reset Password

## Project deployed on heroky
- Sign up is necessary to see how the app is working
- https://auth-note-app.herokuapp.com/

## Installation
1. npm install
2. cd frontent/ npm install
3. cd backend/ npm install
4. change proxy port in frontend/package.json

## config.env
#### add config.env file in root directory with:
1. PORT = Your port
2. dbURL = MongoDB URL
3. JWT_SECRET = Your secret
4. JWT_EXPIRE = milliseconds
5. EMAIL_SERVICE = SendGrid/NodeMailer instructions
6. EMAIL_USERNAME = SendGrid/NodeMailer instructions
7. EMAIL_PASSWORD = SendGrid/NodeMailer instructions
8. EMAIL_FROM = SendGrid/NodeMailer instructions

## Run
npm run dev
