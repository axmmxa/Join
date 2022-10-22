function signUp()  {
    let email = document.getElementById('e-mail').value
    let name = document.getElementById('name').value
    let password = document.getElementById('password').value

    let user = {
        'name': name,
        'email': email,
        'password': password
    }

    addUser(user)
    window.location.href = 'login.html'

    
}

function addUser(user) {
    users.push(user)
    backend.setItem('users', JSON.stringify(users));
}



