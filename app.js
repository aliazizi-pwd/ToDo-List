//Select
const inputTodo = document.querySelector(".input-todo");
const buttonTodo = document.querySelector(".button-todo");
const listTodo = document.querySelector(".item-todo");
const filterTodo = document.getElementById("selected-add");
document.addEventListener("DOMContentLoaded" , getSaveToHtml);

//Add Event
buttonTodo.addEventListener("click" , addToDo);
listTodo.addEventListener("click" , setProfile);
filterTodo.addEventListener("click" , filtering);


// function Main : Add TODO
function addToDo(){
    const divMain = document.createElement("div");
    divMain.classList.add("todo");

    svaeLocalStorage(inputTodo.value);

    const liText = document.createElement("li");
    liText.innerText = inputTodo.value;
    liText.classList.add("padText");
    divMain.appendChild(liText);

    inputTodo.value = "";

    const buttonCompleted = document.createElement("button");
    buttonCompleted.innerHTML = `<i class='fas fa-check'></i>`;
    buttonCompleted.classList.add("button-completed");
    divMain.appendChild(buttonCompleted);


    const buttonTrash = document.createElement("button");
    buttonTrash.innerHTML = `<i class='fas fa-trash'></i>`;
    buttonTrash.classList.add("button-trash");
    divMain.appendChild(buttonTrash);

    const buttonBell = document.createElement("button");
    buttonBell.innerHTML = `<i class='fas fa-bell'></i>`;
    buttonBell.classList.add("button-bell");
    divMain.appendChild(buttonBell);

    listTodo.appendChild(divMain);
}


// buttons TODO
function setProfile(event){
    const itemUl = event.target;
    if (itemUl.classList[0] === "button-completed") {
        const item = itemUl.parentElement;
        item.classList.toggle("show-complete");
    } 
    else if (itemUl.classList[0] === "button-trash") {
        const item = itemUl.parentElement;
        item.remove();
        deleteLocalStorage(item);
    }
    else if (itemUl.classList[0] === "button-bell") {
        const item = itemUl.parentElement;
        itemUl.classList.toggle("bell");
        item.classList.toggle("bell");
    }
}


//Add And Save to Localtorage
function svaeLocalStorage(todo){
    let data;
    if (localStorage.getItem("data") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("data"));
    }
    data.push(todo);
    localStorage.setItem("data" , JSON.stringify(data));
}

// Add And Delete item to LocalStorage
function deleteLocalStorage(todo){
    let data;
    if (localStorage.getItem("data") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("data"));
    } 
    const indexDelete = todo.children[0].innerText;
    console.log(indexDelete);
    data.splice(indexDelete.indexOf(data) , 1);
    localStorage.setItem("data" , JSON.stringify(data));
}

//Filter Todo
function filtering(event){
    const values = listTodo.childNodes;
    values.forEach((item) => {
        switch(event.target.value){
            case "all":
            item.style.display = "flex";
            break;

            case "completed":
            if (item.classList.contains("show-complete")) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
            break;

            case "unCompleted":
            if (item.classList.contains("show-complete")) {
                item.style.display = "none";
            } else {
                item.style.display = "flex";
            }
            break;
        }
    }); 
}


// loded Web Site in Show Value Old is user
function getSaveToHtml(){
    let data;
    if (localStorage.getItem("data") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("data"));
    }   
    data.forEach((todo) => {
        const divMain = document.createElement("div");
        divMain.classList.add("todo");
    

        const liText = document.createElement("li");
        liText.innerText = todo;
        liText.classList.add("padText");
        divMain.appendChild(liText);
    
        const buttonCompleted = document.createElement("button");
        buttonCompleted.innerHTML = `<i class='fas fa-check'></i>`;
        buttonCompleted.classList.add("button-completed");
        divMain.appendChild(buttonCompleted);
    
        const buttonTrash = document.createElement("button");
        buttonTrash.innerHTML = `<i class='fas fa-trash'></i>`;
        buttonTrash.classList.add("button-trash");
        divMain.appendChild(buttonTrash);
    
        const buttonBell = document.createElement("button");
        buttonBell.innerHTML = `<i class='fas fa-bell'></i>`;
        buttonBell.classList.add("button-bell");
        divMain.appendChild(buttonBell);
    
        listTodo.appendChild(divMain);
    });
}