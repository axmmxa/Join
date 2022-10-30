
let todos = []

for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];
    if(currentUser.email == loggedInUser.email){
        todos.push(currentUser.tasks)
    }
}
console.log(users)
console.log(todos)
