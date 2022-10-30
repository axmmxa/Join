let currentDraggedElement

function updateHTML() {
    console.log(todos)
    //container with category open
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