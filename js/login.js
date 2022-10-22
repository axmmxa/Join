// const URLParams = new URLSearchParams(window.location.search)
// const msg = URLParams.get("msg")

// if (msg) {
//     let msgBox = document.getElementById("msgBox")
//     msgBox.innerHTML = msg
// } else {
//     // display: none
// }

function login() {
    let email = document.getElementById("e-mail").value
    let password = document.getElementById("password").value

    let user = users.find(u => u.email == email && u.password == password)

    console.log(user)

    if (user) {
        console.log("User gefunden")
    }
}