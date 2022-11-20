getUsersFromBackend();

function signUp() {
  let email = document.getElementById("e-mail").value;
  let name = document.getElementById("name").value;
  let password = document.getElementById("password").value;

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
  if (!checkUserExist(user.email)) {
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

