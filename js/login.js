const URLParams = new URLSearchParams(window.location.search)
const msg = URLParams.get("msg")
let msgBox = document.getElementById("msgBox")

if (msg && document.getElementById("login-body")) {
    msgBox.innerHTML = msg
    setTimeout(() => {
        msgBox.style.display = "none"
    },2500)
} else {
    msgBox.style.display = "none"
}

 async function login() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];

    let email = document.getElementById("e-mail").value
    let password = document.getElementById("password").value

    console.log(users)
    loggedInUser = users.find(u => u.email == email && u.password == password)
       
    if (loggedInUser) {
        console.log("User gefunden") 
        saveLoggedInUser()
        window.location.href = './summary.html'
    }   
}

document.querySelector('.guest-btn').addEventListener('click', () => {
    console.log("Guest login")
    loggedInUser = {
        "contacts": [],
        "tasks": [],
        "name": "Guest",
        "email": "",
        "password": "",
        "user-background-color": "gray"
    }
    saveLoggedInUser()
    localStorage.setItem("task_id", JSON.stringify(0))
    window.location.href = './summary.html'
})
 
    
function sendEmail() {
    showPopup("forgotPassword-popup")
    document.querySelector(".navbar").style.opacity = 0.5
    document.querySelector(".overlay-container").style.opacity = 0.5
    setTimeout(() => {
        location.href = "resetPassword.html"
    }, 2000)
}

function resetPassword() {
    showPopup("resetPassword-popup")
    document.querySelector(".navbar").style.opacity = 0.5
    document.querySelector(".overlay-container").style.opacity = 0.5
    setTimeout(() => {
        location.href = "../login.html"
    }, 2000)
}
        
        
    
