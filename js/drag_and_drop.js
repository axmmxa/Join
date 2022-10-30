let currentDraggedElement

function updateHTML() {
    let todos = []
    getUserDataLocolstorage()
    loadLoggedInUser()
    for (let i = 0; i < users.length; i++) {
        
        const currentUser = users[i];
  
        if(currentUser.email == loggedInUser.email){
            for (let j = 0; j < currentUser.tasks.length; j++) {
              todos.push(currentUser.tasks[j])
            }
            
        }
      
    }
    console.log(todos)


    //container with category todo
    let todo = todos.filter(t => t['status'] == 'todo')
    console.log(todo)
    
    
    for( let index = 0; index < todo.length; index++) {
        const element = todo[index]
        console.log("test")
        document.getElementById('todo-container').innerHTML += generateTodoHTML(element)
        
    }

    //container with category In progress
   
    for( let index = 0; index < todo.length; index++) {
        const element = todo[index]
        console.log("test")
        document.getElementById('"InProgress-container"').innerHTML += generateTodoHTML(element)
        
    }
    
}

function generateTodoHTML(element) {
    return `
    <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="renderBoardTaskInfo()" class="added-task">
    <span class="task-topic white-text">${element.category}</span>
    <h4 class="task-headline blue-text">${element.title}</h4>
    <span class="added-text">${element.description}</span>
    
    <div class="progress">
        <div class="progress-bar"></div> <span class="addTask-amount"><span>3</span>/<span>3</span> Done</span>
    </div>

    <div class="board-user-img-container">
        <div class="user-tasks"></div>
            <img src="${element.priority}" class="priority-img">
        </div>
    </div>
    `
}

function startDragging(id) {
    currentDraggedElement = id
    console.log(currentDraggedElement)
}


function getUserDataLocolstorage() {
   
        let loggedInUsersAsText = localStorage.getItem('users');
      
        if (loggedInUsersAsText) {
            users = JSON.parse(loggedInUsersAsText)
        }
        return users
}
