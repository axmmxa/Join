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
    document.getElementById('todo').innerHTML =''
    
    for( let index = 0; index < todo.length; index++) {
        const element = todo[index]
        console.log("test")
        document.getElementById('todo').innerHTML += generateTodoHTML(element)
        
    }
    
}

function generateTodoHTML(element) {
    return `
    <div>${element}</div>
    `
}




function getUserDataLocolstorage() {
   
        let loggedInUsersAsText = localStorage.getItem('users');
      
        if (loggedInUsersAsText) {
            users = JSON.parse(loggedInUsersAsText)
        }
        return users
}