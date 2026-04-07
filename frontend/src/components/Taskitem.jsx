import { useState } from "react";


function Taskitem({task, deletetask, toggleTask, onEdit})
{

    const[isEditing, setIsEditing]=useState(false);
    const[editedTitle, setEditedTitle]=useState(task.title);

    const handlesave=()=>{
        if(editedTitle.trim()==="") return;

        onEdit(task.id,editedTitle);
        setIsEditing(false);
    }
    return(

        <>
        <div style={{"backgroundColor":"pink","border":"2px solid black", "marginBottom":"35px","padding":"25px"}}>

            {
                isEditing ?(
                    <>
                       <input value={editedTitle} onChange={(e)=>setEditedTitle(e.target.value)}></input>
                       <button onClick={handlesave} style={{"marginLeft":"10px"}}>Save</button>
                    </>
                    
                ):(

                <>

                    <span 
                    onClick={() => toggleTask(task.id)}
                    style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                    marginRight: "10px",
                    }}
                    >
                        {task.title}
                    </span>

                    <button onClick={()=> setIsEditing(true)} style={{"marginLeft":"20px"}}>Edit</button>
                </>



                )
            }


             <button onClick={()=> deletetask(task.id)} style={{"margin-left":"20px"}}>Delete</button>

        </div>
        </>
    );
}

export default Taskitem;

