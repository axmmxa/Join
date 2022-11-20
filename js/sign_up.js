let email;
let name;
let password;

function signUp() {
  email = document.getElementById("e-mail").value;
  name = document.getElementById("name").value;
  password = document.getElementById("password").value;

  let user = {
    name: name,
    email: email,
    password: password,
    tasks: [],
    contacts: [],
    "user-background-color": "",
  };
  addUser(user);
}

async function addUser(user) {
  if (!checkUserExist) {
    users.push(user);
    await backend.setItem("users", JSON.stringify(users));
    window.location.href =
      "../login.html?msg=Du hast dich erfolgreich angemeldet!";
  } else {
    document.querySelector(".email-exist").classList.remove("d-none");
    setTimeout(() => {
      document.querySelector(".email-exist").classList.add("d-none");
    }, 5000);
  }
}

async function checkUserExist() {
  await getUsersFromBackend();

  for (let i = 0; i < users.length; i++) {
    const element = users[i].email;
    if (element == email) {
      return true;
    } else {
      return false;
    }
  }
}
