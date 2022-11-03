function updateSummary() {
    for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
  
        if(currentUser.email == loggedInUser.email) {
            document.getElementById("task-amount-in-board").innerHTML = currentUser.tasks.length

            currentUser.tasks.forEach(task => {
                if (task.status == "todo") {
                    amount_to_do++;
                }
                if (task.status == "in-progress") {
                    amount_in_progress++;
                }
                if (task.status == "await-feedback") {
                    amount_await_feedback++;
                }
                if (task.status == "done") {
                    amount_done++;
                }

                document.getElementById("task-amount-todo").innerHTML = amount_to_do
                document.getElementById("task-amount-in-progress").innerHTML = amount_in_progress
                document.getElementById("task-amount-await-feedback").innerHTML = amount_await_feedback
                document.getElementById("task-amount-done").innerHTML = amount_done
            });
        }    
    } 
  }
   



