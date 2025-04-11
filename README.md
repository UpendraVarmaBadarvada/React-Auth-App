# Reg-Login App
## Commands to setup and run this app
### Installing Node  
1.)Install node(V22.14.0 and above) and set required environment variables if not set already by node installer.<br>
2.)Check if node is installed by running command "node --version".<br>
### Setting up DB(including table)
1.)Download and Install postgres DB(17.4) from this link https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
2.)Select pgAdmin too while installing postgres which is a DB Client  
3.)Set password and please remember it which you have to enter in .env(DB_PASSWORD) in Backend folder 
4.)Execute commands mentioned in Reg_Login.sql file in Backend/DB folder in pgAdmin Query Tool
   which will create DB and Table for our application   
### Setting up and running Backend(Node-Express API) 
1.)Goto Backend folder  
2.)Run "npm install" to install express, pgadmin client, bcrypt, dotenv and other node libraries  
3.)Run "node Server.js" which starts our backend 
### Setting up and running Frontend(React)
1.)Come back to root folder
2.)Run "npm install -g yarn" to install yarn.<br> 
3.)Run "yarn install" to install react and all of its dependencies including Material UI and its icons.<br> 
4.)Run "yarn run dev" to start the React application. 
