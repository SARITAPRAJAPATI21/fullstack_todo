const conn=require('../db/conn');


 module.exports.addtask=(req,res)=>{
    console.log(' post')
     console.log(req.body)
     const task=req.body.task;
     const q=" INSERT INTO todo_list (task,date) VALUES (?,?)";
     conn.query(q,[task,new Date()],(err,result)=>{
        if(err)
           console.log(err)
           
        else
       {
        const showdata='select * from todo_list';
        conn.query(showdata,(err,newList)=>{
         if(err)
            console.log(" data post  read method")
         console.log('data is inserted',newList)
         res.send(newList)
        })
      
      }
   })    
}

//___________________________________________________//
module.exports.readtask=(req,res)=>{
    const q= 'select * from  todo_list';
    conn.query(q,(err,result)=>{
        if(err)
            res.send(" somthing issuse ")
        else
           res.send(result)
          
    })
    

 }

 //__________________________________________________________


 module.exports.deletetask=(req,res)=>{
    console.log("Hello ji Sever ",req.body.id)
   
    const q= 'DELETE FROM todo_list where id=?;';
    conn.query(q,req.body.id,(err,result)=>{
        if(err)
        {
            console.log("error in deletion part")
        }
        else{
            console.log("delete Sucessfully ")
            conn.query('select * from todo_list',(err,newList)=>{
                res.send(newList)
            })   }
      })
 }

//__________________________________________


module.exports.updatetask=(req,res)=>{

    const id=req.body.updatedId;
    console.log(id,req.body.task)
   const q="update todo_list set task= ? where id =?";
    conn.query(q,[req.body.task,id],(err,result)=>{
        if(err)
            res.send('not updated')
        else
           res.send("updated")
    })

    }



