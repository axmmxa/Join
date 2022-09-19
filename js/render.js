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
    // document.querySelector(".main-field").innerHTML =
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