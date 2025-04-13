// creating references
const inputValue = document.getElementById("inputValue");
const button = document.querySelector(".btn");
const main_todo = document.querySelector(".main_todo_list");

const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("myTodoList")); // convert into original array form
};

const updateLocalStorage = (arr) => {
    return localStorage.setItem("myTodoList",JSON.stringify(arr));
};

let arr = getTodoListFromLocal() || []; // Global scope

const addTodoDynamically = (curVal) => {
    const divElement = document.createElement("div");
    divElement.classList.add("sub_todo_list");
    divElement.innerHTML = `<li>${curVal}</li>  <button class="deleteBtn">Delete</button>`;
    main_todo.append(divElement);
}

const addTodoList = (e) => {
    e.preventDefault(); // preventDefault() is used to stop the browser's default behavior for an event (like stopping form submission or link navigation).

    const items = inputValue.value.trim().toLowerCase();

    inputValue.value = "";

    if(items != "" && !arr.includes(items)) {
        arr.push(items);
        arr = [...new Set(arr)]; // ... spread operator
        console.log(arr);

        localStorage.setItem("myTodoList", JSON.stringify(arr));

        addTodoDynamically(items);
    }
};

const showTodoList = () => {
    console.log(arr);

    arr.forEach((curVal) => {
        addTodoDynamically(curVal);
    });
};

// Show todos on page load
showTodoList();

const removeTodo = (e) => {
    const deleteButton = e.target;
    const parentDiv = deleteButton.parentElement; // this is the <div class="sub_todo_list">
    const listItem = deleteButton.previousElementSibling; // this is the <li> element
    const listContent = listItem.textContent.toLowerCase(); // text inside <li>

    arr = arr.filter((curVal) => {
        console.log(curVal);
        return curVal != listContent;
    });

    updateLocalStorage(arr);
    parentDiv.remove();

    console.log(arr);
};

// remove list
main_todo.addEventListener("click", (e) => {
    e.preventDefault();
    if(e.target.classList.contains("deleteBtn")) {
        removeTodo(e);
    }
});

button.addEventListener("click", (e) => {
    addTodoList(e);
});