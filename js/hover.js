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



