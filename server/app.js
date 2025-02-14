require('dotenv').config({path:'./config.env'})

const cokkiesparser=require('cookie-parser')
const express= require('express');
const app=express();

const cros=require('cors')

const authroutes=require('./src/routes/Authroutes')
const TodoRoutes= require('./src/routes/Todoroutes')

app.use(cros());
app.use(express.json());
app.use(cokkiesparser())

app.use(authroutes)
app.use(TodoRoutes)


const PORT= process.env.PORT ;

app.listen(PORT,()=>{
    console.log('SERVER is running on port no',process.env.PORT);
})
