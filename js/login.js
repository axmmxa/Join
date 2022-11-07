const URLParams = new URLSearchParams(window.location.search)
const msg = URLParams.get("msg")
let msgBox = document.getElementById("msgBox")

if (msg) {
    msgBox.innerHTML = msg
    setTimeout(() => {
        msgBox.style.display = "none"
    },2500)
} else {
    msgBox.style.display = "none"
}

function login() {
    let email = document.getElementById("e-mail").value
    let password = document.getElementById("password").value
    
    loggedInUser = users.find(u => u.email == email && u.password == password)
    console.log(loggedInUser)

    if (loggedInUser) {
        console.log("User gefunden") 
        saveLoggedInUser()
        window.location.href = './summary.html'
    } else {
        loggedInUser = {
            "contacts": [],
            "tasks": [],
            "name": "Guest",
            "email": "",
            "password": "",
            "user-background-color": "gray"
        }
        saveLoggedInUser()
        window.location.href = './summary.html'
    }
}