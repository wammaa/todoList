let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList = [];

addButton.addEventListener('click',addTask)

function addTask(){
  let taskContent = taskInput.value
  taskList.push(taskContent)
  console.log(taskList)
  render()
}

function render(){
  let resultHTML = '';
  for(let i = 0; i<taskList.length; i++){
    resultHTML +=`<div class="task">
    <div>${taskList[i]}</div>
    <div>
      <button>Check</button>
      <button>Delete</button>
    </div>
  </div>`;
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

document.getElementById("test").innerHTML = '<h1>noona</h1>'
document.getElementById("test").textContent = '<h1>noona</h1>'
