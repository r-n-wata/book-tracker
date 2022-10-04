const deleteBtn = document.querySelectorAll('.del')
const bookItem = document.querySelectorAll('span.not')
const bookComplete = document.querySelectorAll('span.completed')
const bookReading = document.querySelectorAll('span.reading')
const bookUnmarkComplete = document.querySelectorAll('span.incomplete')
const bookArchive = document.querySelectorAll('span.archive')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletebook)
})


Array.from(bookReading).forEach((el)=>{
    el.addEventListener('click', markWorkingOn)
})

Array.from(bookUnmarkComplete).forEach((el)=>{
    el.addEventListener('click', unmarkComplete)
})


Array.from(bookArchive).forEach((el)=>{
    el.addEventListener('click', markArchive)
})


Array.from(bookComplete).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

// Array.from(todoComplete).forEach((el)=>{
//     el.addEventListener('click', markIncomplete)
    
// })

async function deleteBook(){
    const bookId = this.parentNode.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteBook', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bookIdFromJSFile': bookId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markReading(){
    const bookId = this.parentNode.parentNode.dataset.id
    try{
        const response = await fetch('books/markReading', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bookIdFromJSFile': bookId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


async function unmarkComplete(){
    const bookId = this.parentNode.parentNode.dataset.id
    try{
        const response = await fetch('books/unmarkComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bookIdFromJSFile': bookId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markArchive(){
    const bookId = this.parentNode.parentNode.dataset.id
    try{
        const response = await fetch('books/markArchive', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bookIdFromJSFile': bookId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const bookId = this.parentNode.parentNode.dataset.id
    console.log(bookId)
    try{
        const response = await fetch('books/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bookIdFromJSFile': bookId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// async function markIncomplete(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/markIncomplete', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }



const openAddBook = document.querySelector('.add-book-open-btn')
const submitBookBtn = document.querySelector('.submit-book')
const addBookContainer = document.querySelector('.add-book--container')

openAddBook.addEventListener('click', () =>{
    addBookContainer.style.display = 'flex'
    addBookContainer.classList.remove('hidden')
})


submitBookBtn.addEventListener('click', () =>{
    addBookContainer.style.display = 'none'
})
