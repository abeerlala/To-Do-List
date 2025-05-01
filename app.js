const tasksContainer = document.querySelector(".taskList");
const taskInput = document.getElementById("taskInput");
const taskSubmit = document.getElementById("taskSubmit");


let arr = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    document.querySelectorAll(".taskP").forEach(el => el.remove());

    arr.forEach((task) => {
        let taskP = document.createElement("p");
        taskP.classList.add("taskP");
        taskP.innerText = task;
        tasksContainer.append(taskP);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
        taskP.append(deleteBtn);

        const checkBtn = document.createElement("button");
        checkBtn.classList.add("deleteBtn");
        checkBtn.classList.add("checkBtn");
        checkBtn.innerHTML = "<i class='fa-solid fa-check'></i>";
        taskP.append(checkBtn);

        deleteBtn.addEventListener("click", () => {
            deleteBtn.parentElement.remove()
            arr.pop(deleteBtn.parentElement)
            localStorage.setItem("tasks", JSON.stringify(arr));
        })

        checkBtn.addEventListener("click", () => {
            checkBtn.parentElement.classList.toggle("taskPDone")
        })
    });
}

// Display New Or Existing Tasks

displayTasks();

// Add New Task
taskSubmit.addEventListener("click", (evt) => {
    evt.preventDefault();
    let newTask = taskInput.value;
    if (newTask.trim() !== "") {
        arr.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(arr));
        displayTasks();
        taskSubmit.style.marginBottom = "0"; 
        taskInput.style.marginBottom = "0";
        document.querySelector(".warn").style.display = "none";
    } else {
        taskInput.style.marginBottom = "10px";
        taskSubmit.style.marginBottom = "10px"; 
        document.querySelector(".warn").style.display = "block";
    }
    taskInput.value = "";
});