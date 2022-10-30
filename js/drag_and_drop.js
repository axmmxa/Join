
for (let i = 0; i < users.length; i++) {
    const currentUser = users[i];
    if(currentUser.email == loggedInUser.email){
        currentUser.tasks.id = i
    }
}
