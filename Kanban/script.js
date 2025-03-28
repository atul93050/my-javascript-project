let dragcard = null
let rightClicked = null
document.addEventListener('DOMContentLoaded', loadTasks)
function add_task(columnId) {
    const input = document.getElementById(`${columnId}-input`)
    //console.log(input)
    //console.log(input.value)
    const inputValue = input.value.trim()
    // console.log(inputValue)
    if (inputValue === "") {
        return
    }
    const taskDate = new Date().toLocaleString()
    const taskElement = createTaskElement(inputValue, taskDate);

    document.getElementById(`${columnId}-tasks`).appendChild(taskElement);
    saveTasks(columnId, inputValue, taskDate)
    input.value = ""
    updateAllTasksCount()
}

function createTaskElement(inputValue, taskDate) {
    const taskElement = document.createElement("div")
    taskElement.innerHTML = `<span>${inputValue}</span> <br> <small class="time">${taskDate}</small>`
    taskElement.classList.add('card')
    // taskElement.setAttribute("draggable",true)
    taskElement.draggable = true
    taskElement.addEventListener("dragstart", dragStart)
    taskElement.addEventListener("dragend", dragEnd)

    taskElement.addEventListener("contextmenu", function (event) {
        event.preventDefault()

        rightClicked = this

        showContextmenu(event.pageX, event.pageY)

    })
    return taskElement
}

function dragStart() {
    this.classList.add("dragging")
    dragcard = this

    setTimeout(() => {
        this.style.opacity = "0.5";
        this.style.transform = "scale(1.05)";
    }, 0);
}

const columns = document.querySelectorAll(".column .tasks")
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver)
})

function dragEnd() {
    this.classList.remove("dragging")
    dragcard.style.opacity = "1";
    dragcard.style.transform = "scale(1)";
    dragcard.style.transition = "transform 0.2s ease-out";
    dragcard = null
    updateTasks()
    updateAllTasksCount()


}


function dragOver(event) {
    event.preventDefault()
    this.classList.add("drag-over");

    // if (dragcard) {  //Check if dragcard is not null
    //     this.appendChild(dragcard)

    // }

    const afterElement = getDragAfterElement(this, event.pageY);
    if (afterElement === null) {
        this.appendChild(dragcard)
    }
    else {
        this.insertBefore(dragcard, afterElement)
    }

}

function getDragAfterElement(container, y) {
    const draggableElements = [
        ...container.querySelectorAll(".card:not(.dragging")
    ];
    const result = draggableElements.reduce((closestElementUnderMouse, currentTask) => {
        const box = currentTask.getBoundingClientRect()
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closestElementUnderMouse.offset) {
            return { offset: offset, element: currentTask }
        }
        else {
            return closestElementUnderMouse
        }
    }, { offset: Number.NEGATIVE_INFINITY })

    return result

}


const contextmenu = document.querySelector(".menu")
function showContextmenu(x, y) {

    contextmenu.style.left = `${x + window.scrollX}px`
    contextmenu.style.top = `${y + window.scrollY}px`
    contextmenu.style.display = "block"
}

window.addEventListener("click", () => {
    setTimeout(() => {
        contextmenu.style.display = "none";
    }, 200);
})


function editTask() {
    if (rightClicked !== null) {
        const spanElement = rightClicked.querySelector("span")
        const newTaskText = prompt("Edit Task", spanElement.textContent)
        if (newTaskText !== null && newTaskText.trim() !== "") {
            spanElement.textContent = newTaskText.trim()
        }
    }
    contextmenu.style.display = "none"
    updateTasks()
}

function deleteTask() {
    if (rightClicked !== null) {

        rightClicked.remove()

    }
    contextmenu.style.display = "none"
    updateTasks()
    updateAllTasksCount()
}

function updateAllTasksCount() {
    ["todo", "doing", "done"].forEach((columnId) => {
        const count = document.querySelectorAll(`#${columnId}-tasks .card`).length;
        document.getElementById(`${columnId}-count`).textContent = count;
    });
}

// save, retrieve, update tasks in local storage

function saveTasks(columnId, inputValue, taskDate) {
    const tasks = JSON.parse(localStorage.getItem(columnId))
    taskDate.push({ text: inputValue, date: taskDate })
    localStorage.setItem(columnId, JSON.stringify(tasks))

}

function loadTasks() {
    ['todo', 'doing', 'done'].forEach((columnId) => {
        const tasks = JSON.parse(localStorage.getItem(columnId)) || []
        tasks.forEach(({ text, date }) => {
            const taskElement = createTaskElement(text, date)
            document.getElementById(`${columnId}-tasks`).appendChild(taskElement)
        })

    })
}

function updateTasks() {
    ['todo', 'doing', 'done'].forEach((columnId) => {
        const tasks = []
        document.querySelectorAll(`#${columnId}-tasks .card`).forEach((card) => {
            const taskText = card.querySelector("span").textContent
            const taskDate = card.querySelector("small").textContent
            tasks.push({ text: taskText, date: taskDate })

        })
        localStorage.setItem(columnId, JSON.stringify(tasks))

        updateAllTasksCount()
    })
}