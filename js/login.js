document.querySelector(".task-urgent").addEventListener("mouseover", () => {
    document.querySelector(".task-urgent").style.border = "1px solid rgba(0,0,0,0.2)"
    document.querySelector(".summary-count-white").style.color = "#4589FF"
    document.querySelector(".task-urgent-left-part-2-text").style.color = "#4589FF"
    document.querySelector(".date").style.color = "#4589FF"
    document.querySelector(".deadline").style.color = "#4589FF"
    document.querySelector(".white-border").style.backgroundColor = "#4589FF"
})

document.querySelector(".task-urgent").addEventListener("mouseout", () => {
    document.querySelector(".task-urgent").style.border = "none"
    document.querySelector(".summary-count-white").style.color = "white"
    document.querySelector(".task-urgent-left-part-2-text").style.color = "white"
    document.querySelector(".date").style.color = "white"
    document.querySelector(".deadline").style.color = "white"
    document.querySelector(".white-border").style.backgroundColor = "white"
})


document.querySelector(".task-card-upper").addEventListener("mouseover", () => {
    document.querySelector(".summary-count-black").style.color = "#4589FF"
})

document.querySelector(".task-card-upper").addEventListener("mouseout", () => {
    document.querySelector(".summary-count-black").style.color = "black"
})


// document.querySelectorAll(".task-card-lower").forEach(card => {
//     card.addEventListener("mouseover", (element) => {
//         let id_number = (element.path[0].id).slice(-1)
//         let img = ["", "img/kanban_logo/summary-icons/Board.png", "img/kanban_logo/summary-icons/In Progress.png", "img/kanban_logo/summary-icons/Awaiting feedback.png", "img/kanban_logo/summary-icons/Done.png"]
//         let tasks = ["", "Task in Board", "Task in Progress", "Awaiting Feedback", "Tasks Done"]


//         document.getElementById(`task-card-lower-${id_number}`).innerHTML =
//             `
//             <div class="inner-task-card">
//             <div>
//                 <div class="task-to-do">
//                     <img class="summary-img img-hover-effects" src="${img[id_number]}">
//                     <span class="summary-count-black white-text">1</span>
//                 </div>
//             </div>

//             <div>
//                 <p class="blue-text white-text">${tasks[id_number]}</p>
//             </div>
//             </div>
//             `
//     })
// })


// document.querySelectorAll(".task-card-lower").forEach(card => {
//     card.addEventListener("mouseout", (element) => {
//         let id_number = (element.path[0].id).slice(-1)
//         let img = ["", "img/kanban_logo/summary-icons/Board.png", "img/kanban_logo/summary-icons/In Progress.png", "img/kanban_logo/summary-icons/Awaiting feedback.png", "img/kanban_logo/summary-icons/Done.png"]
//         let tasks = ["", "Task in Board", "Task in Progress", "Awaiting Feedback", "Tasks Done"]


//         document.getElementById(`task-card-lower-${id_number}`).innerHTML =
//             `
//             <div class="inner-task-card">
//             <div>
//                 <div class="task-to-do">
//                     <img class="summary-img" src="${img[id_number]}">
//                     <span class="summary-count-black">1</span>
//                 </div>
//             </div>

//             <div>
//                 <p class="blue-text">${tasks[id_number]}</p>
//             </div>
//             </div>
//             `
//     })
// })


// Write her to test git branch 