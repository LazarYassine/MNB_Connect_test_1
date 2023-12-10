//import { data } from "./db2"

const data = require("./db2")
console.log(data)

// function AddTodo() {
//     var task = document.getElementById('txtTodo').value
//     // fetch("db.json")
//     //     .then((Response)=> Response.json())
//     //     .then((data) => console.log(date))
//     //     .catch( (error) => console.error(error) )

//     // console.log(document.getElementById('txtTodo').value)
//     // console.table(todoList)
//     todoList.push({"id" :todoList.length + 1, "task": task.toString(), "completed": "false"})
//     // todoList.id = 4
//     // todoList.task = "Read Quran"
//     // todoList.completed = "true"
//     // todoList.dueDate = "2023-03-28"
//     //console.table(todoList.length)

//     todoList.forEach(todo => {
//         var child = `<div class="list_item" >
//         <span style="color:white" >${todo.task}</span>
//     </div>`

//         document.getElementsById("buttomSide").appendChild(child)

//     });
function AddTodo() {
    var task = document.getElementById('txtTodo').value;
    todoList.push({"id": todoList.length + 1, "task": task.toString(), "completed": false});
  
    var listContainer = document.getElementById("buttomSide");
    listContainer.innerHTML = "";
  
    todoList.forEach(todo => {
      var child = `<div id="task_${todoList.length}" class="list_item" >
        <span style="color:white">${todo.task}</span>
      </div>`;
      listContainer.innerHTML += child;
    });
  }
  
