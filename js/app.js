// Todos :
    ///////* Create New Todo
    ///////* Recovery Todos
    ///////* Clear Todos Btn


const $ = document

//? Todos Array 
let todos = []

//? Input & Create New Todo
const newTodoInput = $.querySelector("#itemInput")
const addNewTodoBtn = $.querySelector("#addButton")
const clearTodosBtn = $.querySelector("#clearButton")
const todoContainer = $.querySelector("#todoList")
    //* Create New Todo
    
    function addTodo() {
        let inputValue = newTodoInput.value

        //! New Object & Push

        let newTodoObject = {
            id: todos.length + 1, 
            content: inputValue, 
            status: false,       
        }
        
        newTodoInput.value = ""

        newTodoInput.focus()

        todos.push(newTodoObject)

        setData(todos)

        //! New Todo Element
        generateElement(todos)   
    } 

    function setData(todo) {
        localStorage.setItem("todos", JSON.stringify(todo))
    }

    function generateElement(todosList) {
        let newTodoLiElem, newTodoLabel, newTodoCompleteBtn, newTodoDeleteBtn;

        todoContainer.innerHTML = ""

        todosList.forEach(function (object) {
            newTodoLiElem = $.createElement("li")
            newTodoLiElem.id = object.id
            newTodoLiElem.className = "completed well"
            
            newTodoLabel = $.createElement("label")
            newTodoLabel.innerHTML = object.content
            
            newTodoCompleteBtn = $.createElement("button")
            newTodoCompleteBtn.className = "btn btn-success"
            newTodoCompleteBtn.innerHTML = "Complete"
            newTodoCompleteBtn.setAttribute("onclick", "todoStatus(" + object.id + ")")    
            
            newTodoDeleteBtn = $.createElement("button")
            newTodoDeleteBtn.className = "btn btn-danger"
            newTodoDeleteBtn.innerHTML = "Delete"
            newTodoDeleteBtn.setAttribute("onclick", "removeTodo(" + object.id + ")")    

            //! Todo Status
            if (object.status) {
                newTodoLiElem.className = "uncompleted well"
                newTodoCompleteBtn.innerHTML = "UnComplete"
            }

            //! Appends
            newTodoLiElem.append(newTodoLabel, newTodoCompleteBtn, newTodoDeleteBtn)
            todoContainer.append(newTodoLiElem)
        })


    }

    function todoStatus(todoId) {
        let localStorageData = JSON.parse(localStorage.getItem("todos"))
        todos = localStorageData

        console.log(localStorageData);
        todos.forEach(function (todo) {
            if (todo.id == todoId) {
                todo.status = !todo.status
            }
        })

        setData(todos)
        generateElement(todos)
    }

    function removeTodo(todoId) {
        let localStorageData = JSON.parse(localStorage.getItem("todos"))
        todos = localStorageData

        let mainTodoIndex = todos.findIndex(function (todo) {
            return todo.id == todoId            
        })

        todos.splice(mainTodoIndex, 1)
        setData(todos)
        generateElement(todos)
    }

    function recoveryTodos() {
        let localStorageTodos = JSON.parse(localStorage.getItem("todos"))

        if (localStorageTodos) {
            todos = localStorageTodos
        } else {
            todos = []
        }

        generateElement(todos)
    }
    //* Add Events
    addNewTodoBtn.addEventListener("click", addTodo)
    newTodoInput.addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            addTodo()
        }
    }) 

    window.addEventListener("load", recoveryTodos)
    clearTodosBtn.addEventListener("click", function () {
        todos = []
        todoContainer.innerHTML = ""
        localStorage.removeItem("todos")
    })