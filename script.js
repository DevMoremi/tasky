const newTask = document.getElementById('text')
const listContainer = document.querySelector('.ul-collection')
const addTaskButton = document.getElementById('task-button')
const clearTaskButton = document.querySelector('.black')
const filter = document.getElementById('filter-text')

// the function creating the html elements 
function createTodoItem(value){
    let li = document.createElement('li');
    let small = document.createElement('small');
    li.appendChild(small)
    small.innerHTML = value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '&times';
    li.appendChild(span);
}

// let todos = localStorage.getItem("todos"); // null

// if(todos === null){
//     todos = "[]"
// }

// console.log(todos); // []

//the function saving the values into my local storage
function setTodo(value) {
    const todos = localStorage.getItem("todos") ?? "[]";

    const parseTodo = JSON.parse(todos);
    parseTodo.push(value);
    localStorage.setItem("todos", JSON.stringify(parseTodo));
}
// the function removing the values from my local storage
function removeFromTodo(value) {
    const todos = localStorage.getItem("todos");

    if (todos) {
        const parseTodo = JSON.parse(todos);
        const filteredTodo = parseTodo.filter((todo) => todo !== value);
        localStorage.setItem("todos", JSON.stringify(filteredTodo));
    }
}
//the filtering listener function
filter.addEventListener('input',function(event){
    const inputtedValue = event.target.value.toLowerCase();

    const todos = localStorage.getItem("todos");
    const parseTodo = JSON.parse(todos);
    console.log("inputtedValue" , inputtedValue)

    if(parseTodo){
        // Get only the inputted values from the todos
        const filterTodo = parseTodo.filter((todoItem)=> todoItem.toLowerCase().includes(inputtedValue));
        console.log('todo' , filterTodo)

        listContainer.innerHTML = "";
        filterTodo.forEach(todo => {
            createTodoItem(todo)
        });
    }
})
// listener function adding the click event to my addtask button
addTaskButton.addEventListener('click', function (e) {
    if (newTask.value === '') {
        alert('Add a task')
    } else {
        createTodoItem(newTask.value)
    }
    setTodo(newTask.value);
    newTask.value = '';
    e.preventDefault()
})

//listener function removing/deleting values from my webpage and my storage
listContainer.addEventListener('click', function (e) {
    const itemToRemove = e.target.parentElement.firstElementChild.innerHTML;
    
    if (e.target.nodeName === 'SPAN') {
        if (confirm('Are you sure?')) {
            e.target.parentElement.remove();
            removeFromTodo(itemToRemove);
        }
        
    }
})
//listener function adding the click event of clearing all my tasks from my webpage and my local storage
clearTaskButton.addEventListener('click', function () {
   listContainer.innerHTML = "";
    localStorage.removeItem("todos")
})
// the function gets my values from the local storage so as to still display when page refreshes
function showData() {
    const todos = localStorage.getItem("todos");
    if (todos) {
        const parseTodo = JSON.parse(todos);
        parseTodo.forEach(todo => {
            createTodoItem(todo)
        });
    }
}

showData();

