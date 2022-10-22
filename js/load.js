setURL('https://gruppe-319.developerakademie.net/smallest_backend_ever')

let users = [];

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}


    
//function deleteUser(name) {
  // await backend.deleteItem('users');
 //}
