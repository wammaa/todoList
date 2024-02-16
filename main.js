//유저가 값을 입력한다
//+버튼을 누르면, 할일이 추가된다
//delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 생긴다
//check버튼을 누르면 true false
//true면 끝난걸로 간주하고 밑줄 false면 진행중
//진행중 끝남 탭을 누르면 바가 이동한다
//끝남 탭은 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나온다
//전체탭을 누르면 전체 아이템으로 돌아옴
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = [];
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask)
taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for(let i = 1; i < tabs.length; i++){
  tabs[i].addEventListener("click", function(event){
    filter(event);
  });
}

function addTask(){
  let taskValue = taskInput.value;
  if(taskValue === ""){
    return alert("할일을 입력하세요")
  }
  let task = {
    id : randomID(),
    taskContent : taskInput.value,
    isComplete : false
  }
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render(){
  let list = [];
  if(mode === "all"){
    list = taskList;
  }else if(mode === "ongoing" || mode === "done"){
    list = filterList;
  }
  let resultHTML = '';
  for(let i = 0; i < list.length; i++){
    if(list[i].isComplete == true){
      resultHTML += `<div class="task">
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
      <button onclick="toggleComplete('${list[i].id}')" class="check-button"><i class="fa-solid fa-check"></i></i></button>
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
  filter();
}

function deleteTask(id){
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
      break;
    }
  }
  filter();
}

function filter(event){
  if(event){
    mode = event.target.id;
    underLine.style.left = event.currentTarget.offsetLeft + 'px';
    underLine.style.width = event.currentTarget.offsetWidth + 'px';
    underLine.style.top =
      (event.currentTarget.offsetTop - 3) + event.currentTarget.offsetHeight + 'px';
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
    console.log("진행중", filterList)
  }else if(mode === "done"){
    for(let i = 0; i < taskList.length; i++){
      if(taskList[i].isComplete === true){
        filterList.push(taskList[i]);
      }
    }
    render();    
  }
}

function randomID(){
  return '_' + Math.random().toString(36).substr(2, 9);
}

