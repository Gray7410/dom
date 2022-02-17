const tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест после урока',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить ДЗ после урока',
    },
]

let isNightTheme = false

const nightTheme = () => {
    const body = document.querySelector('body')
    body.style.background = '#24292E'
    body.style.setProperty('--checkbox-border-color', '#ffffff')
    body.style.color = '#ffffff'
    const createTaskBlockInput = document.querySelector('.create-task-block__input')
    createTaskBlockInput.style.background = '#B0C4DE'
    const taskItem = document.querySelectorAll('.task-item')
    for (const elem of taskItem) {
        elem.style.color = '#ffffff'
    }
    const allButtons = document.querySelectorAll('button')
    for (const button of allButtons) {
        button.style.border = '1px solid #ffffff'
    }
}

function addTaskItem (item) {
const tasksList = document.querySelector('.tasks-list')
const taskItem = document.createElement('div')
taskItem.classList.add('task-item')
taskItem.dataset.taskId = item.id
const mainContainer = document.createElement('div')
mainContainer.classList.add('task-item__main-container')
const mainContent = document.createElement('div')
mainContent.classList.add('task-item__main-content')
const checkboxForm = document.createElement('form')
checkboxForm.classList.add('checkbox-form')
const checkbox = document.createElement('input')
checkbox.classList.add('checkbox-form__checkbox')
checkbox.type = 'checkbox'
checkbox.id = `task-` + item.id
const label = document.createElement('label')
label.htmlFor = 'task-' + item.id
const span = document.createElement('span')
span.classList.add('task-item__text')
span.innerText = item.text
const button = document.createElement('button')
button.classList.add('task-item__delete-button','default-button', 'delete-button')
button.dataset.deleteTaskItem = item.id
button.innerText = `Удалить`

tasksList.insertAdjacentElement('afterbegin', taskItem)
taskItem.insertAdjacentElement('afterbegin', mainContainer)
mainContainer.insertAdjacentElement('afterbegin', mainContent)
mainContent.insertAdjacentElement('afterbegin', checkboxForm)
checkboxForm.insertAdjacentElement('afterbegin', checkbox)
checkboxForm.insertAdjacentElement('beforeend', label)
mainContent.insertAdjacentElement('beforeend', span)
mainContent.insertAdjacentElement('afterend', button)
}

tasks.forEach (item => addTaskItem(item))

const createTaskForm = document.querySelector('.create-task-block')
createTaskForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event)
    const { target } = event
    const taskNameInput = target.taskName
    const inputValue = taskNameInput.value.trim()
    let isError = false
    const errorMessageBlock = document.createElement('span')
    const createTaskBlock = document.querySelector('.create-task-block')
    for (item of tasks) {
        if (item.text === inputValue) {
            errorMessageBlock.classList.add('error-message-block')
            errorMessageBlock.innerText = `Задача с таким названием уже существует.`
            createTaskForm.insertAdjacentElement('afterbegin', errorMessageBlock)
            isError = true
        }
    }
    if(!inputValue) {
        errorMessageBlock.classList.add('error-message-block')
        errorMessageBlock.innerText = `Название задачи не должно быть пустым`
        createTaskForm.insertAdjacentElement('afterbegin', errorMessageBlock)
        isError = true
    } else if (!isError) {
        tasks.push({
            id: Date.now().toString(),
            completed: false,
            text: inputValue
        })
        addTaskItem(tasks[tasks.length - 1])
        if(isNightTheme) {
            nightTheme()
        }
        console.log(tasks)
        const isErrorMessageBlock = document.querySelector('.error-message-block')
        if(isErrorMessageBlock) {
            isErrorMessageBlock.remove()
        }
    }
})

const tasksList = document.querySelector('.tasks-list')
tasksList.addEventListener('click', (event) => {
    const deleteId = event.target.dataset.deleteTaskItem
    const isDeleteButton = event.target.closest('.task-item__delete-button')
    if (isDeleteButton) {
        const modalOverlay = document.createElement('div')
        modalOverlay.classList.add('modal-overlay', 'modal-overlay_hidden')
        const deleteModal = document.createElement('div')
        deleteModal.classList.add('delete-modal')
        const deleteModalQuestion = document.createElement('h3')
        deleteModalQuestion.classList.add('delete-modal__question')
        deleteModalQuestion.innerText = `Вы действительно хотите удалить эту задачу?`
        const deleteModalButtons = document.createElement('div')
        deleteModalButtons.classList.add('delete-modal__buttons')
        const deleteModalCancelButton = document.createElement('button')
        deleteModalCancelButton.classList.add('delete-modal__button', 'delete-modal__cancel-button')
        deleteModalCancelButton.innerText = `Отмена`
        deleteModalCancelButton.addEventListener('click', event => {
            modalOverlay.remove()
        })
        const deleteModalConfirmButton = document.createElement('button')
        deleteModalConfirmButton.classList.add('delete-modal__button', 'delete-modal__confirm-button')
        deleteModalConfirmButton.innerText = `Удалить`
        deleteModalConfirmButton.addEventListener('click', event => {
            const deleteButton = document.querySelector(`[data-task-id='${deleteId}']`)
            deleteButton.remove()
            modalOverlay.remove()
            console.log(`deleteButton`, deleteButton)
            console.log(deleteId)
        })
        const body = document.querySelector('body')
        const tasksList = document.querySelector('.tasks-list')
        tasksList.prepend(modalOverlay)
        modalOverlay.prepend(deleteModal)
        deleteModal.prepend(deleteModalQuestion)
        deleteModal.append(deleteModalButtons)
        deleteModalButtons.prepend(deleteModalCancelButton)
        deleteModalButtons.append(deleteModalConfirmButton)
    }
})

document.addEventListener('keydown', event => {
    if(event.code === 'Tab') {
        isNightTheme = !isNightTheme
        console.log(isNightTheme)
        if(isNightTheme) {
            console.log(isNightTheme)
            nightTheme()
        } else {
            const body = document.querySelector('body')
            body.style.background = 'initial'
            const taskItem = document.querySelectorAll('.task-item')
            for (const elem of taskItem) {
                elem.style.color = 'initial'
            }
            const allButtons = document.querySelectorAll('button')
            for (const button of allButtons) {
                button.style.border = 'initial'
            }
        }
    }
    console.log(event.code)
})
