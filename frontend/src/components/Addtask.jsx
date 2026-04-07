import { useState } from "react";

function Addtask({onAdd}) {
  const [task, setTask] = useState("");

  const handleTask=()=>{

    if(task.trim()==="") return;

    onAdd(task);
    setTask("");

  };
  
  return (
    <>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{"margin-bottom":"30px" ,"padding":"25px","margin-top":"35px"}}
      />
      <button type="submit" onClick={handleTask}  style={{"padding":"25px","margin-top":"35px", "marginLeft":"35px"}}>Add</button>
    </>
  );
}
export default Addtask;
