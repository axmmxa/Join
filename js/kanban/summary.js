document.querySelector(".task-urgent").addEventListener("mouseover", () => {
  document.querySelector(".task-urgent").style.border = "1px solid rgba(0,0,0,0.2)"
  document.querySelector(".task-urgent").style.borderTopLeftRadius = "0px"
  document.querySelector(".summary-count-white").style.color = "#4589FF"
  document.querySelector(".task-urgent-left-part-2-text").style.color = "#4589FF"
  document.querySelector(".date").style.color = "#4589FF"
  document.querySelector(".deadline").style.color = "#4589FF"
  document.querySelector(".white-border").style.backgroundColor = "#4589FF"
})

document.querySelector(".task-urgent").addEventListener("mouseout", () => {
  document.querySelector(".task-urgent").style.border = "none"
  document.querySelector(".task-urgent").style.borderTopLeftRadius = "18px"
  document.querySelector(".summary-count-white").style.color = "white"
  document.querySelector(".task-urgent-left-part-2-text").style.color = "white"
  document.querySelector(".date").style.color = "white"
  document.querySelector(".deadline").style.color = "white"
  document.querySelector(".white-border").style.backgroundColor = "white"
})

document.querySelector(".task-card-upper").addEventListener("mouseover", () => {
  document.querySelector(".summary-count-black").style.color = "#4589FF"
  document.querySelector(".task-card-upper").style.borderTopLeftRadius = "0px"
})

document.querySelector(".task-card-upper").addEventListener("mouseout", () => {
  document.querySelector(".summary-count-black").style.color = "black"
  document.querySelector(".task-card-upper").style.borderTopLeftRadius = "18px"
})


function updateSummary() {
    if (loggedInUser.name !== "Guest") {
        for (let i = 0; i < users.length; i++) {
            const currentUser = users[i];
            addTaskAmountCounter(currentUser)
            renderTaskAmount()
            if (currentUser.email == loggedInUser.email) {
                document.getElementById("task-amount-in-board").innerHTML = currentUser.tasks.length
            }
        }
    } else {
        document.getElementById("task-amount-in-board").innerHTML = loggedInUser.tasks.length
        addTaskAmountCounter(loggedInUser)
        renderTaskAmount()
    }
}

function renderTaskAmount() {
    document.getElementById("task-amount-urgent").innerHTML = amount_task_urgent
    document.getElementById("task-amount-todo").innerHTML = amount_to_do
    document.getElementById("task-amount-in-progress").innerHTML = amount_in_progress
    document.getElementById("task-amount-await-feedback").innerHTML = amount_await_feedback
    document.getElementById("task-amount-done").innerHTML = amount_done
}

function addTaskAmountCounter(user) {
    user.tasks.forEach(task => {
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
        if (task.priority == "Urgent") {
            amount_task_urgent++;
        }
    });
}


if (document.getElementById("summary-body")) {
    document.querySelector(".task-urgent").addEventListener("click", () => {
        location.href = "board.html"
    })
    document.querySelector(".task-card-upper").addEventListener("click", () => {
        location.href = "board.html"
    })
    for (let i = 1; i <= document.querySelectorAll(".task-card-lower").length; i++) {
        document.querySelector(`#task-card-lower-${i}`).addEventListener("click", () => {
            location.href = "board.html"
        })
    }
}

