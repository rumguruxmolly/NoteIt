document.addEventListener('DOMContentLoaded', () => { //line works after document loaded
    if (document.getElementById('btn')) { 
        document.getElementById('btn').addEventListener('click', add)}

    if (document.getElementById('clear')) {
        document.getElementById('clear').addEventListener('click', clearAll)}

    function add() {
        const nam = document.getElementById("input").value.trim() //removes any whitespace w trim

        if (nam === '') {
            document.getElementById('input').style.borderColor = 'brown' //If empty border color of input changes
        } else {
            const id = Date.now()
            addTodoToList(nam, id, false, 'Container')
            saveToDoToLocalStorage(nam, id, false)
            document.getElementById('input').value = ''
            document.getElementById('input').style.borderColor = 'rgb(153, 106, 165)'
        }
    }

    function saveToDoToLocalStorage(text, id, isCompleted) {
        const todos = JSON.parse(localStorage.getItem('todos')) || []
        todos.push({ text, id, isCompleted })
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || []
        todos.forEach(todo => {
            const containerId = todo.isCompleted ? 'completedContainer' : 'Container'
            addTodoToList(todo.text, todo.id, todo.isCompleted, containerId)
        })
    }

    function addTodoToList(text, id, isCompleted, containerId) {
        const checkbox = document.createElement('input')
        checkbox.id = id
        checkbox.name = text
        checkbox.value = text
        checkbox.type = 'checkbox'
        checkbox.checked = isCompleted

        const label = document.createElement('label')
        label.htmlFor = id
        label.appendChild(document.createTextNode(text))

        const listItem = document.createElement('div')
        listItem.id = id
        listItem.appendChild(checkbox)
        listItem.appendChild(label)

        checkbox.addEventListener('change', () => {
            moveTodo(checkbox, id, text)
        })

        const containerElement = document.getElementById(containerId)
        if (containerElement) {
            containerElement.appendChild(listItem)
        }
    }

    function moveTodo(checkbox, id, text) {
        const isChecked = checkbox.checked
        const sourceContainerId = isChecked ? 'Container' : 'completedContainer'
        const targetContainerId = isChecked ? 'completedContainer' : 'Container'

        const sourceContainer = document.getElementById(sourceContainerId)
        const targetContainer = document.getElementById(targetContainerId)
        const listItem = document.getElementById(id)

        if (sourceContainer && listItem) {
            sourceContainer.removeChild(listItem)
        }

        if (targetContainer) {
            targetContainer.appendChild(listItem)
        }

        updateToDoInLocalStorage(id, isChecked)
    }

    function updateToDoInLocalStorage(id, isCompleted) {
        const todos = JSON.parse(localStorage.getItem('todos')) || []
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, isCompleted } : todo
        )
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
    }

    function clearAll() {
        localStorage.removeItem('todos') 
        const containerElement = document.getElementById('completedContainer')
        if (containerElement) {
            while (containerElement.firstChild) {
                containerElement.removeChild(containerElement.firstChild)
            }
        }
    }

    loadTodos()
})
