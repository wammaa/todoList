let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("under-line");

tabs.forEach((menu) =>
  menu.addEventListener('click', (e) => underLineIndicator(e))
);

let underLineIndicator = (e) => {
  underLine.style.left = e.currentTarget.offsetLeft + 'px';
  underLine.style.width = e.currentTarget.offsetWidth + 'px';
  underLine.style.top =
    (e.currentTarget.offsetTop - 3) + e.currentTarget.offsetHeight + 'px';
};

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for(let i = 1; i < tabs.length; i++){
  tabs[i].addEventListener("click",function(event){
    filter(event);
  });
}
console.log(tabs);

function addTask(){
  if(taskInput.value == ""){
    return;
  }
  let task = {
    id : randomIDGenerate(),
    taskContent : taskInput.value,
    isComplete : false
  }
  taskList.push(task);
  console.log(taskList);
  render();
}

function render(){
  let list = [];
  if(mode === "all"){
    list = taskList;
  } else if(mode === "ongoing" || mode === "done"){
    list = filterList;
  }
  let resultHTML = '';
  for(let i = 0; i < list.length; i++){
    if(list[i].isComplete == true){
      resultHTML +=`<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div class="button-area">
        <button onclick="toggleComplete('${list[i].id}')" class="return-button"><i class="fa-solid fa-arrow-rotate-left"></i></button>
        <button onclick="deleteTask('${list[i].id}')" class="delete-button"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`
    }else{
    resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div class="button-area">
      <button onclick="toggleComplete('${list[i].id}')" class="check-button"><i class="fa-solid fa-check"></i></button>
      <button onclick="deleteTask('${list[i].id}')" class="delete-button"><i class="fa-solid fa-trash"></i></button>
    </div>
  </div>`
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter()
}

function deleteTask(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
      break;
    }
  }
  render();
}

function filter(event){
  if(event){
    mode = event.target.id;
  }
  filterList = [];
  if(mode === "all"){
    render();
  }else if(mode === "ongoing"){
    for(let i = 0; i < taskList.length; i++){
      if(taskList[i].isComplete === false){
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  }else if(mode === "done"){
    for(let i = 0; i < taskList.length; i++){
      if(taskList[i].isComplete === true){
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate(){
  return '_' + Math.random().toString(36).substr(2, 9);
}