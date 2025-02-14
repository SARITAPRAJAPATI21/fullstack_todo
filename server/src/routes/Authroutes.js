
const { register,login,auth,verifytoken } = require('../controller/AuthController');


const router=require('express').Router();


router.post('/register',register)

router.post('/login',login);

router.get('/auth',verifytoken, auth)



module.exports=router;

