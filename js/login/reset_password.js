let new_password = ""
let confirmed_password = ""

function resetPassword() {
    new_password = document.getElementById("new-password").value
    confirmed_password = document.getElementById("confirmed-password").value
    
    if (new_password == confirmed_password) {
        localStorage.setItem("new-password", new_password)
        redirectToForgotPassword()
    } else {
        document.querySelector(".email-not-matching").classList.remove("d-none")
        setTimeout(() => {
            document.querySelector(".email-not-matching").classList.add("d-none")
        }, 2500)
    }
}

function checkPasswordLength() {
    new_password = document.getElementById("new-password").value
    confirmed_password = document.getElementById("confirmed-password").value
    let email_not_matching = document.querySelector(".email-not-matching")

    if (new_password.length <= 8 || confirmed_password.length <= 8 || !email_not_matching.classList.contains("d-none")) {
        document.querySelector(".min-length-password").classList.remove("d-none")
    } else {
        document.querySelector(".min-length-password").classList.add("d-none")
    }
}

function redirectToForgotPassword() {
    showPopup("resetPassword-popup")
    document.querySelector(".popups").style.opacity = 1
    document.querySelector(".white-overlay").style.backgroundColor = "white"
    document.querySelector(".white-overlay").style.opacity = 0.25
    setTimeout(() => {
      location.href = "forgotPassword.html"
    }, 2000)
}
