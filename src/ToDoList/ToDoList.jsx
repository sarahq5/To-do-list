import React, { useState } from "react";
import './ToDoList.css'
function ToDoList() {
  const [rows, setRows] = useState([]);

  // add row
  function addRow() {
    const newRow = {
      title: "",
      category: "", 
      deadline:"",
      status: "Start",
      

    };

    setRows((prev) => [...prev, newRow]);
  }

  // update row
  function handleChange(index, field, value) {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value
      };
      return updated;
    });
  }

  function deleteRow(index){
    setRows((prev)=>{
        return prev.filter((_, i) =>i !== index);
    });
  }

  function toggleEdit(index){
    setRows((prev)=> {
        const updated =[...prev];
        updated[index].isEditing = !updated[index].isEditing;
        return updated;
    });
  }

  function handleAction(index, value){
    if(value ==="delete"){
        deleteRow(index);
    }
    else if(value==="edit"){
        toggleEdit(index);
    }
  }


  return (
    <div className="container">
      <div className="btn">
        <button onClick={addRow}>+</button>
      </div>
      <table >
        <thead className="header">
          <tr>
            <th className="on">#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Deadline</th>
            <th className="tw">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="in">{index + 1}</td>

              <td>
                <input
                  type="text"
                  value={row.title}
                  onChange={(e) =>
                    handleChange(index, "title", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="text"
                  value={row.category}
                  onChange={(e) =>
                    handleChange(index, "category", e.target.value)
                  }
                />
              </td>

                    <td className="dd">
                        <input type="date" value={row.deadline}
                        onChange={(e)=> (index, "deadline", e.target.value)} />
                    </td>

              <td>
                <select
                  value={row.status}
                  onChange={(e) =>
                    handleChange(index, "status", e.target.value)
                  }
                >
                  <option value="Start">Start</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

              </td>
              <td>
                    <select  
                    defaultValue=""
                    onChange={(e)=>
                        handleAction(index, e.target.value)
                    }>
                        <option className="op" value=" disabled">...</option>
                        <option value="delete">🗑</option>
                    </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
      </div>
  );
}

export default ToDoList;