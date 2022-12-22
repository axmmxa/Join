

async function sendEmail() {
    let mail = document.getElementById("mail").value
    let userExist = await checkUserEmailExist(mail);

    if (userExist) {
        new_password = localStorage.getItem("new-password")

        let fd = new FormData()
        fd.append("mail", mail)
        fd.append("message", `Hello Join User, \n\n` +
        `here is your new password:  ${new_password}. \n\n` +
        `Hint: Use a password manager to preserve all your passwords. \n\n` +
        `Best regards, \n\n` + 
        `your Join Team`)

        await fetch("https://emir-salihovic.developerakademie.net/send_mail/send_mail_join.php", {
            method: "POST",
            body: fd
        })
    } else {
        document.querySelector(".email-not-found").classList.remove("d-none")

        setTimeout(() => {
            document.querySelector(".email-not-found").classList.add("d-none")
        }, 2500)
    }    
}


function redirectToLogin() {
    localStorage.removeItem("new-password")
    showPopup("forgotPassword-popup")
    document.querySelector(".popups").style.opacity = 1
    document.querySelector(".white-overlay").style.backgroundColor = "white"
    document.querySelector(".white-overlay").style.opacity = 0.25
    setTimeout(() => {
      location.href = "../login.html"
    }, 2000)
}