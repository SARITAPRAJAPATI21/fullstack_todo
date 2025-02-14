const router=require('express').Router();

const {addtask,readtask,deletetask,updatetask} =require('../controller/Todocontroller')


router.post('/addtask',addtask)

router.get('/readtask',readtask)

router.post('/deletetask',deletetask)

router.post("/updatetask",updatetask)

module.exports=router;