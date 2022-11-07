function toggleLogoutBox() {

    if (window.innerWidth <= 684) {
        document.querySelector(".logout-mobile").classList.toggle("d-none")
    } else {
        document.querySelector(".logout").classList.toggle("d-none")
    }

}

function logout() {
    localStorage.setItem('loggedInUser', '')
     window.location.href = "./login.html"
}

