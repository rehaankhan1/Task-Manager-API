# Task-Manager-API
CRUD Back-End API With NodeJS, ExpressJS, MongooseJS, MongoDB
Node_modules in Use -> mongoose, validator, bcryptjs, jwt[jsonWebTokens], Sharp, 

## Installation
Use the commannd to install all node_modules as well as dependencies
```bash
npm install
```
We have declared Enviroment variables in config>dev.env
```bash
PORT=3000
SENDGRID_API_KEY=PasteSendGRIDApi Here(SignUp for their service)[We will use this to email user during signup as well as termination of account]
MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api
JWT_SECRET=YourSecretKeyHere
```
# Usage
run the following command 
```bash
npm run dev
```

This Command is being declared in package.json file as following
```bash 
"scripts": {
    "start": "node src/index.js",
    "dev": "env-cmd ./config/dev.env nodemon src/index.js"
  },
```
The dev command with [env-cmd ./config/dev.env] will ensure running and setting the enviroment variable , which you can further use in your program
by [process.env.ENV_VAR_NAME]

# Working
## Prerequisite
1-> Run The mongoDB Server
2-> Connect it with either MongoDB Atlas Or Robo3T

## Configuration For POSTMAN
-> Add Following Test in Create User as Well as Login Request
[Create User Request]
```bash
if(pm.response.code === 201) {
    pm.environment.set('authToken', pm.response.json().token)
}
```

[Login User Request]
```bash
if(pm.response.code === 200) {
    pm.environment.set('authToken', pm.response.json().token)
}
```

In POSTMAN > Settings Icon[Manage Enviroment] > Click Add & Add the following :-

### [1.1] When Testing on Local Enviroment
*(NOTE), DO NOT ASSIGN VALUE TO AUTH TOKEN, It will be assigned by our test Script.
![2](https://user-images.githubusercontent.com/20107730/68329196-c24cf680-00f6-11ea-9b9c-469af1926783.PNG)

*(NOTE), DO NOT ASSIGN VALUE TO AUTH TOKEN, It will be assigned by our test Script.
### [1.2] When Testing On Production Enviroment
![as](https://user-images.githubusercontent.com/20107730/68481215-9cd9fd00-025c-11ea-8676-bdc633e4bebb.PNG)

### [2] Project > Setting > Edit
![111111](https://user-images.githubusercontent.com/20107730/68481401-1b369f00-025d-11ea-9682-d22259b79085.PNG)

### [3] Choose Type > Bearer Token > Set Token Value > {{authToken}}
![22222222](https://user-images.githubusercontent.com/20107730/68481499-60f36780-025d-11ea-9697-3aeef4e89c37.PNG)
*(Note) authToken is the variable which we set up in [1] Step


## Creating User
![3](https://user-images.githubusercontent.com/20107730/68329405-2b346e80-00f7-11ea-9203-98f825856c02.PNG)
As Soon as you SignUp you will get an email regarding signup.

## Login User
![4](https://user-images.githubusercontent.com/20107730/68329521-6afb5600-00f7-11ea-865a-9adfee5a1d60.PNG)

## Logout Current Session User
![5](https://user-images.githubusercontent.com/20107730/68329773-fffe4f00-00f7-11ea-9dd8-464d71ccd94c.PNG)

## Logout Every User Ever Logged in Anywhere on Earth :p
![6](https://user-images.githubusercontent.com/20107730/68329879-3dfb7300-00f8-11ea-9fa0-aab68964cbaf.PNG)

## Delete User
![7](https://user-images.githubusercontent.com/20107730/68329983-7733e300-00f8-11ea-868b-e00f1a17b14d.PNG)

## Read Profile
![8](https://user-images.githubusercontent.com/20107730/68330136-b104e980-00f8-11ea-931a-2e5900d6341f.PNG)

## Create Task
![9](https://user-images.githubusercontent.com/20107730/68330273-f75a4880-00f8-11ea-9790-1e3315e90695.PNG)

## Read Single Task By ID
![11](https://user-images.githubusercontent.com/20107730/68330770-d0504680-00f9-11ea-8b9a-6a345032d70f.PNG)

## Read Tasks In Descending Order
![12](https://user-images.githubusercontent.com/20107730/68331017-38069180-00fa-11ea-981f-b05965ce4cc0.PNG)

## Read Tasks In Ascending Order
![13](https://user-images.githubusercontent.com/20107730/68331136-769c4c00-00fa-11ea-8517-48da0715832b.PNG)

## Read Task In Desc Order , Limit only 2
![14](https://user-images.githubusercontent.com/20107730/68331249-ab100800-00fa-11ea-8b4a-4d9a6c05ecd8.PNG)

## Read Task In Desc Order, Limit only 2 , Ski the first record from Data
![15](https://user-images.githubusercontent.com/20107730/68332468-e4e20e00-00fc-11ea-893e-12cc489300b1.PNG)

## Update Details of User
![18](https://user-images.githubusercontent.com/20107730/68332581-15c24300-00fd-11ea-9a51-238fcbbc6a39.PNG)

## Update Task By It's ID
![19](https://user-images.githubusercontent.com/20107730/68332730-4dc98600-00fd-11ea-8721-5d5dccb23faa.PNG)

## Delete a Task By It's ID
![20](https://user-images.githubusercontent.com/20107730/68332866-794c7080-00fd-11ea-97c7-acf6c046190e.PNG)

## Upload a Profile Photograph For Current User
![21](https://user-images.githubusercontent.com/20107730/68332952-a7ca4b80-00fd-11ea-90da-be3938447e07.PNG)

## View The Profile Photograph For Current User
http://localhost:3000/users/PasteIDoFUserHere/avatars
![22](https://user-images.githubusercontent.com/20107730/68333217-21623980-00fe-11ea-9899-30fada7b046d.PNG)

# Working with MongoDB , In Production
https://medium.com/@rehaancool796/how-to-setup-mongodb-production-database-12-steps-b54159dc17e6
You can Read this article on medium, which I wrote for people who want to try this project :)
When Uploading This project to heroku I have set enviroment variables with the help of the following command below -
```bash
[heroku config:set key=value key1=value key2=value]
heroku config:set SENDGRID_API_KEY=value  JWT_SECRET=YourSecretKeyHere   MONGODB_URL="The url you got from the atlas website(read medium article for more)"
```

























