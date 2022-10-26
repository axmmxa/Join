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
  }
  
async function addUser(user) {
    users.push(user)
    await backend.setItem('users', JSON.stringify(users));
    window.location.href = '../login.html?msg=Du hast dich erfolgreich angemeldet!' 
  }
  