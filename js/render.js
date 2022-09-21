function init() {
    renderSummary()
}

function renderSummary() {
    document.querySelector(".main-field").innerHTML =
        `<div class="summary-container">
        <span class="gm-text">Good Morning, <span class="user-name">Name</span></span>
        <p class="mobile-headline">Kanban Project Management Tool</p>
        <div class="inner-summary-container">
            <div class="upper-task-container">
                <div class="task-urgent">
                    <div class="task-urgent-left-part">
                        <div class="task-urgent-left-part-1">
                            <img src="img/kanban_logo/summary-icons/Urgent.png">
                            <span class="summary-count-white">1</span>
                        </div>

                        <div class="task-urgent-left-part-2">
                            <p class="task-urgent-left-part-2-text">Task-urgent</p>
                        </div>

                    </div>

                    <div class="white-border">

                    </div>

                    <div class="task-urgent-right-part">
                        <div>
                            <p class="date">16 Oktober 2022</p>
                        </div>
                        <div>
                            <p class="deadline">Upcoming deadline</p>
                        </div>

                    </div>

                </div>

                <div class="task-card-upper">
                    <div class="inner-task-card-upper">
                        <div class="img-count-container">
                            <div class="task-to-do">
                                <img class="summary-img" src="img/kanban_logo/summary-icons/Board.png" alt="">
                                <span class="summary-count-black">1</span>
                            </div>
                        </div>

                        <div class="task-text">
                            <p class="blue-text">Task To-do</p>
                        </div>
                    </div>

                </div>

            </div>

            <div class="lower-task-container">

                <div id="task-card-lower-1" class="task-card-lower">
                    <div class="inner-task-card">
                        <div>
                            <div class="task-to-do">
                                <img class="summary-img" src="img/kanban_logo/summary-icons/Board.png" alt="">
                                <span class="summary-count-black">5</span>
                            </div>
                        </div>

                        <div>
                            <p class="blue-text">Task In Board</p>
                        </div>
                    </div>
                </div>

                <div id="task-card-lower-2" class="task-card-lower">
                    <div class="inner-task-card">
                        <div>
                            <div class="task-to-do">
                                <img class="summary-img" src="img/kanban_logo/summary-icons/In Progress.png" alt="">
                                <span class="summary-count-black">5</span>
                            </div>
                        </div>

                        <div>
                            <p class="blue-text">Task In Progress</p>
                        </div>
                    </div>
                </div>

                <div id="task-card-lower-3" class="task-card-lower">
                    <div class="inner-task-card">
                        <div>
                            <div class="task-to-do">
                                <img class="summary-img" src="img/kanban_logo/summary-icons/Awaiting feedback.png" alt="">
                                <span class="summary-count-black">5</span>
                            </div>
                        </div>

                        <div>
                            <p class="blue-text">Awaiting Feedback</p>
                        </div>
                    </div>
                </div>

                <div id="task-card-lower-4" class="task-card-lower">
                    <div class="inner-task-card">
                        <div>
                            <div class="task-to-do">
                                <img class="summary-img" src="img/kanban_logo/summary-icons/Done.png" alt="">
                                <span class="summary-count-black">1</span>
                            </div>
                        </div>

                        <div>
                            <p class="blue-text">Tasks Done</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="sidebar-mobile">
        <div class="kanban-btns">
            <div class="kanban-link"><img class="kanban-img" src="img/kanban_logo/summary.png"><span>Summary</span></div>
            <div class="kanban-link"><img class="kanban-img" src="img/kanban_logo/board.png"><span>Board</span></div>
            <div class="kanban-link"><img class="kanban-img" src="img/kanban_logo/addTask.png"><span>Add Task</span></div>
            <div class="kanban-link"><img class="kanban-img" src="img/kanban_logo/contacts.png"><span>Contacts</span></div>
        </div>
    </div>`
}


function renderBoard() {
    document.querySelector(".main-field").innerHTML = `
    <div class="board-container">
                <span class="board-headline-mobile blue-text">Kanban Project Mangement Tool</span>
                <div class="search-field">
                    <div class="input-container">
                        <input placeholder="Find task" type="text" class="input">
                        <img class="search-img" src="img/kanban_logo/search.png">
                    </div>
                    <button class="add-btn"><span class="white-text">Add Task</span><img class="add-img" src="img/kanban_logo/add.png"></button>
                </div>

                <div class="board-task-container">
                    <div class="board-to-do width-25">
                        <div class="flex">
                            <h3 class="board-task-title">To do</h3>
                            <img class="board-task-img" src="img/kanban_logo/plus button.png">
                        </div>

                        <div class="added-task">
                            <span class="task-topic white-text">Design</span>
                            <h4 class="task-headline blue-text">Redesign Website</h4>
                            <span class="added-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                            <div class="progress">
                                <div class="progress-bar"></div> <span class="addTask-amount"><span>3</span>/<span>3</span> Done</span>
                            </div>
                            <div class="board-user-img-container">
                                <div class="user-tasks"></div>
                                <img src="img/kanban_logo/non-urgent-green.png" class="priority-img">
                            </div>
                        </div>

                    </div>
                    <div class="board-in-progress width-25">
                        <div class="flex">
                            <h3 class="board-task-title">In Progress</h3>
                            <img class="board-task-img" src="img/kanban_logo/plus button.png">
                        </div>

                        <div class="added-task">
                            <span class="task-topic white-text">Design</span>
                            <h4 class="task-headline blue-text">Redesign Website</h4>
                            <span class="added-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                            <div class="progress">
                                <div class="progress-bar"></div> <span class="addTask-amount"><span>3</span>/<span>3</span> Done</span>
                            </div>
                            <div class="board-user-img-container">
                                <div class="user-tasks"></div>
                                <img src="img/kanban_logo/non-urgent-green.png" class="priority-img">
                            </div>
                        </div>

                        <div class="added-task">
                            <span class="task-topic white-text">Design</span>
                            <h4 class="task-headline blue-text">Redesign Website</h4>
                            <span class="added-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                            <div class="progress">
                                <div class="progress-bar"></div> <span class="addTask-amount"><span>3</span>/<span>3</span> Done</span>
                            </div>
                            <div class="board-user-img-container">
                                <div class="user-tasks"></div>
                                <img src="img/kanban_logo/non-urgent-green.png" class="priority-img">
                            </div>
                        </div>

                    </div>
                    <div class="board-await-feedback width-25">
                        <div class="flex">
                            <h3 class="board-task-title">Await Feedback</h3>
                            <img class="board-task-img" src="img/kanban_logo/plus button.png">
                        </div>

                        <div class="added-task">
                            <span class="task-topic white-text">Design</span>
                            <h4 class="task-headline blue-text">Redesign Website</h4>
                            <span class="added-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                            <div class="progress">
                                <div class="progress-bar"></div> <span class="addTask-amount"><span>3</span>/<span>3</span> Done</span>
                            </div>
                            <div class="board-user-img-container">
                                <div class="user-tasks"></div>
                                <img src="img/kanban_logo/non-urgent-green.png" class="priority-img">
                            </div>
                        </div>

                        <div class="added-task">
                            <span class="task-topic white-text">Design</span>
                            <h4 class="task-headline blue-text">Redesign Website</h4>
                            <span class="added-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                            <div class="progress">
                                <div class="progress-bar"></div> <span class="addTask-amount"><span>3</span>/<span>3</span> Done</span>
                            </div>
                            <div class="board-user-img-container">
                                <div class="user-tasks"></div>
                                <img src="img/kanban_logo/non-urgent-green.png" class="priority-img">
                            </div>
                        </div>
                    </div>
                    <div class="board-done width-25">
                        <div class="flex">
                            <h3 class="board-task-title">Done</h3>
                            <img class="board-task-img" src="img/kanban_logo/plus button.png">
                        </div>

                        <div class="added-task">
                            <span class="task-topic white-text">Design</span>
                            <h4 class="task-headline blue-text">Redesign Website</h4>
                            <span class="added-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                            <div class="progress">
                                <div class="progress-bar"></div> <span class="addTask-amount"><span>3</span>/<span>3</span> Done</span>
                            </div>
                            <div class="board-user-img-container">
                                <div class="user-tasks"></div>
                                <img src="img/kanban_logo/non-urgent-green.png" class="priority-img">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `
}

function renderAddTasks() {
    // document.querySelector(".main-field").innerHTML =
}

function renderContacts() {
    // document.querySelector(".main-field").innerHTML =
}

function renderLegalNotice() {
    // document.querySelector(".main-field").innerHTML =
}