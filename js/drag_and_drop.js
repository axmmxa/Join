updateHTML()

let currentDraggedElement;


function checkUserTasks() {
    console.log(todos)
    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        
        if(currentUser.email == loggedInUser.email) {
            for (let j = 0; j < currentUser.tasks.length; j++) {
              todos.pop(todos[j])
              todos.push(currentUser.tasks[j])
            } 
        }
    }
}


function updateHTML() {
    console.log('todos', todos)
    console.log("updateHTML function")
    // getUserDataLocalstorage()
    loadLoggedInUser()
    checkUserTasks()
    
    // if(x) {
    //   checkUserTasks()
    //   x = false
    // }
    
    //container with category todo
    let todo = todos.filter(t => t['status'] == 'todo')

    document.getElementById('todo').innerHTML = ""
    document.getElementById('todo').innerHTML += 
        `
        <div class="flex">
        <h4 class="board-task-title">To do</h4>
        <img onclick="renderSmallAddTask()" class="board-task-img" src="kanban_img/plus_icons/plus_button.png">
        </div>
        `

    for( let index = 0; index < todo.length; index++) {
        const element = todo[index]
        
        document.getElementById('todo').innerHTML += generateTodoHTML(element)

        let assignedContacts = document.querySelector(`#assigned-contact-${element.id_task}`)
        element.assignedContacts.forEach(contact => {
            assignedContacts.innerHTML += 
            `<div>
                <span class="user-icon">${getUserIcon(contact)}</span>  
            </div>` 
        });
        
        
    }

    //container with category In progress
    let inProgress = todos.filter(t => t['status'] == 'in-progress')
    
    document.getElementById('in-progress').innerHTML = ""
    document.getElementById('in-progress').innerHTML += 
        `
        <div class="flex">
        <h4 class="board-task-title">In Progress</h4>
        <img onclick="renderSmallAddTask()" class="board-task-img" src="kanban_img/plus_icons/plus_button.png">
        </div>
        `

    for( let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index]
        
        document.getElementById('in-progress').innerHTML += generateTodoHTML(element)
        
        let assignedContacts = document.querySelector(`#assigned-contact-${element.id_task}`)
        element.assignedContacts.forEach(contact => {
            assignedContacts.innerHTML += 
            `<div>
                <span id="${contact}" class="user-icon">${getUserIcon(contact)}</span>  
            </div>` 
        });
        
    }

    //container with category Await Feedback
    let awaitFeedback = todos.filter(t => t['status'] == 'await-feedback')
    
    document.getElementById('await-feedback').innerHTML = ""
    document.getElementById('await-feedback').innerHTML += 
        `
        <div class="flex">
        <h4 class="board-task-title">Await Feedback</h4>
        <img onclick="renderSmallAddTask()" class="board-task-img" src="kanban_img/plus_icons/plus_button.png">
        </div>
        `

    for(let index = 0; index < awaitFeedback.length; index++) {
        const element = awaitFeedback[index]
        
        document.getElementById('await-feedback').innerHTML += generateTodoHTML(element)

        let assignedContacts = document.querySelector(`#assigned-contact-${element.id_task}`)
        element.assignedContacts.forEach(contact => {
            assignedContacts.innerHTML += 
            `<div>
                <span id="${contact}" class="user-icon">${getUserIcon(contact)}</span>  
            </div>`  
        });
     
    }

    //container with category done
    let done = todos.filter(t => t['status'] == 'done')
    
    document.getElementById('done').innerHTML = ""
    document.getElementById('done').innerHTML += 
        `
        <div class="flex">
        <h4 class="board-task-title">Done</h4>
        <img onclick="renderSmallAddTask()" class="board-task-img" src="kanban_img/plus_icons/plus_button.png">
        </div>
        `

    for( let index = 0; index < done.length; index++) {
        const element = done[index]
        console.log(element)

        document.getElementById('done').innerHTML += generateTodoHTML(element)
        
        let assignedContacts = document.querySelector(`#assigned-contact-${element.id_task}`)
        element.assignedContacts.forEach(contact => {
            assignedContacts.innerHTML += 
            `<div>
            <span id="${contact}" class="user-icon">${getUserIcon(contact)}</span>  
            </div>` 
        });
       
    }
    
    getCategoryColor()

}


function generateTodoHTML(element) {
    
    return `
    <div draggable="true" ondragstart="startDragging(${element['id_task']})" onclick="renderBoardTaskInfo(${JSON.stringify(element).split('"').join("&quot;")})" class="added-task">
    <span class="task-topic white-text">${element.category}</span>
    <h4 class="task-headline blue-text">${element.title}</h4>
    <span class="added-text">${element.description}</span>
    
    <div class="progress">
        <div class="progress-bar"></div> <span class="addTask-amount"><span>0</span>/<span>${element.subtask.length}</span> Done</span>
    </div>

    <div class="board-user-img-container">
        <div id="assigned-contact-${element.id_task}" class="user-tasks">
            
        </div>
        
        <img src="${element.priority}" class="priority-img">
        
    </div>
    `
}

function startDragging(id_task) {
    currentDraggedElement = id_task
    console.log(currentDraggedElement)
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    todos[currentDraggedElement]['status'] = status // status will change
    updateHTML()
}


function getUserDataLocalstorage() {
        let loggedInUsersAsText = localStorage.getItem('users');
      
        if (loggedInUsersAsText) {
            users = JSON.parse(loggedInUsersAsText)
        }
        return users
}
