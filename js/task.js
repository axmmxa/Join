loadLoggedInUser()

function saveTask()  {
    let title = document.getElementById('input-title').value
    let contacts = document.getElementById('contacts').value
    let due_date = document.getElementById('due-date').value
    let task_category = document.getElementById('task-category').value
    let priority;
    let description = document.getElementById('textarea').value
    let subtask_category = document.getElementById('subtask-category').value
  
    let task = {
        'title': title,
        'contacts': contacts,
        'due-date': due_date,
        'task-category': task_category,
        'description': description,
        'subtask-category': subtask_category,
        'loggedInUser': loggedInUser.name
    }
    addTask(task)  
  }
  
async function addTask(task) {
    tasks.push(task)
    await backend.setItem('tasks', JSON.stringify(task));
  }

  function showAddContact(value) {
    if (value == "Invite new contact") {
      let contacts = document.getElementById("contacts")
      let add_option = document.querySelector(".add-option")
      let arrow_select_contact = document.getElementById("arrow-select-contact")

      contacts.classList.add("d-none")
      arrow_select_contact.classList.add("d-none")
      add_option.classList.remove("d-none")

    }
  }


  function closeAddContact() {
    let contacts = document.getElementById("contacts")
      let add_option = document.querySelector(".add-option")
      let arrow_select_contact = document.getElementById("arrow-select-contact")

      contacts.classList.remove("d-none")
      arrow_select_contact.classList.remove("d-none")
      add_option.classList.add("d-none")

  }
  

  function addNewContactOption() {
    let add_contact_input = document.getElementById("add-contact-input").value
    let contacts = document.getElementById("contacts")

    contacts.innerHTML += `<option value="${add_contact_input}">${add_contact_input}</option>`

  }