import Taskitem from "./Taskitem";
function Tasklist({tasks, deletetask ,toggleTask, onEdit})
{
    return(
        <>
          <div>

            {
              tasks.map((task)=>(

                <Taskitem
                key={task.id}
                task={task}
                deletetask={deletetask}
                toggleTask={toggleTask}
                onEdit={onEdit}
                />

              ))
            }
            
          </div>
        </>
    );
}

export default Tasklist;