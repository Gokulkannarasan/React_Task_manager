import express from "express";
import {db} from "../db.mjs";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router();//instead of routing all routes in app.mjs express lets us to split routes into files.
router.use(authMiddleware);
console.log("✅ tasks routes loaded");


// get all tasks

router.get("/",(req,res)=>{
    const sql="select * from tasks where user_id=?";

    db.query(sql,[req.user.id],(err,results)=>{
        if(err) return res.status(500).json({error:err.message});
        res.json(results);
    });
});

// get all tasks by id.

router.get("/:id", (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM tasks WHERE id = ?";// ? are placeholders when we give val it gets in it.

    db.query(sql, [id], (err, results) => { // the [id] this array replaces ? in the code.
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(results[0]);
    });
});


// put a new task

router.put("/:id",(req,res)=>{

    const {id}=req.params;
    const{title}=req.body;

    if(!title)
    {
        return res.status(400).json({error:"Nothing to update here"});
    }

    const sql="update tasks set title=? where id=? ";

    db.query(sql,[title,id],(err,results)=>{

        if(err)
        {
            return res.status(500).json({error:err.message});
        }

        if(results.affectedRows===0)
        {
            return res.status(404).json({error:"Task not found"});
        }

        res.json({
            id,
            title
        });
    });



});




//post a new task

router.post("/", (req,res)=>{

    const{ title }=req.body;

    if(!title)
    {
        return res.status(400).json({error:"title is required"});
    }

    const sql="insert into tasks (title,user_id) values (?, ?)";

    db.query(sql, [title,req.user.id], (err,results)=>{
        if(err)
        {
            return res.status(400).json({error:err.message});
        }
        
        res.status(201).json({
            id:results.insertId,
            title,
            completed: false
        });
    });
});

//update tasks

router.patch("/:id", (req,res)=>{
    const { id }=req.params;
    const {completed}=req.body;

    const sql="update tasks set completed=? where id=? and user_id=?";

    db.query(sql, [completed,id, req.user.id], (err,results)=>{
        if(err)
        {
            return res.status(500).json({error:err.message});
        }
        res.json({message:"Task updated"});
    });
});

// delete task

router.delete("/:id", (req,res)=>{

    const { id }= req.params;

    const sql="delete from tasks where id=? and user_id=?";

    db.query(sql,[id,req.user.id], (err,results)=>{

        if(err) return res.status(500).json({error:err.message});
        res.json({message:"Task deleted"});

    });
});

export default router;