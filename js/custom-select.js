function showCustomSelectOptions(index) {
    
  let selects =  document.querySelectorAll(".custom-select-options-container")

  for (let i = 0; i < selects.length; i++) {
    if (i == index) {
        selects[i].classList.toggle("d-none")   
    }
  }
      
}


function showAddContact(index) {
    let custom_select = document.querySelectorAll(".custom-select")
    let add_option = document.querySelectorAll(".add-option")
    let plus_select = document.querySelectorAll(".plus-select")

    for (let i = 0; i < add_option.length; i++) {
        if (i == index) {
            custom_select[index].classList.add("d-none")
            plus_select[index].classList.add("d-none")
            add_option[index].classList.remove("d-none")
        }
    }
    
  }

  function closeAddContact(index) {
    let custom_select = document.querySelectorAll(".custom-select")
    let add_option = document.querySelectorAll(".add-option")
    let plus_select = document.querySelectorAll(".plus-select")


    for (let i = 0; i < add_option.length; i++) {
        if (i == index) {
            custom_select[index].classList.remove("d-none")
            plus_select[index].classList.remove("d-none")
            add_option[index].classList.add("d-none")
        }
    }
  }
  

  function addNewContactOption(index) {
    let custom_select_options_container = document.querySelectorAll(".custom-select-options-container")
    let add_contact_input = document.getElementById("add-contact-input").value

    custom_select_options_container[index].innerHTML += `<label class="custom-select-option"> ${add_contact_input} <input onclick="returnSelectedContacts(this)" value="${add_contact_input}" class="selected-option" type="checkbox"></label> `
    
  }

  
function showAddSubtask() {
    let subtask_category_container = document.querySelector("#subtask-category")
    let add_option_subtask = document.querySelector(".add-option-subtask")
    let plus_select = document.querySelector(".plus-select-subtask")

    subtask_category_container.classList.add("d-none")
    plus_select.classList.add("d-none")
    add_option_subtask.classList.remove("d-none")
         
  }


  function closeAddSubtask() {
    let subtask_category_container = document.querySelector("#subtask-category")
    let add_option_subtask = document.querySelector(".add-option-subtask")
    let plus_select = document.querySelector(".plus-select-subtask")

    subtask_category_container.classList.remove("d-none")
    plus_select.classList.remove("d-none")
    add_option_subtask.classList.add("d-none")
     
  }

  function addNewSubtask() {
    let category_container = document.querySelector(".category-container")
    let add_subtask_input = document.getElementById("add-subtask-input").value
    

    category_container.innerHTML += 
        `<label for="${add_subtask_input}"><input value="${add_subtask_input}" onclick="returnSelectedSubtasks(this)" type="checkbox" id="${add_subtask_input}"><span class="category-span">${add_subtask_input}</span></label>`
    
  }
  

