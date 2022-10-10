const deleteBtn = document.querySelectorAll('.del')
const bookItem = document.querySelectorAll('span.not')
const bookComplete = document.querySelectorAll('span.completed')
const bookReading = document.querySelectorAll('span.reading')
const bookUnmarkComplete = document.querySelectorAll('span.incomplete')
const bookArchive = document.querySelectorAll('span.archive')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteBook)
})


Array.from(bookReading).forEach((el)=>{
    el.addEventListener('click', markReading)
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


// submitBookBtn.addEventListener('click', () =>{
//     addBookContainer.style.display = 'none'
// })


// collecting data from user

const findBook = document.querySelector('#find-book')

findBook.addEventListener('click', () => {
    const formData = {}

    formData.userInput = document.querySelector('#user-input').value
    formData.searchBy = document.querySelector('#search-type').value

    console.log(formData)


    // search in google api

    async function fetchBooks() {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${formData.userInput}&key=AIzaSyBA1Ti2jkQlPqIO7iyMlWnA9VJauBIbddU`);
        // waits until the request completes..
        // turns into an object
        const data = res.json()
        return data
      }

    fetchBooks().then(books => {
        

        books = books.items.map(book => ({
           title: book.volumeInfo.title,
           authors: book.volumeInfo.authors,
           image: book.volumeInfo.imageLinks.smallThumbnail && book.volumeInfo.imageLinks.smallThumbnail
        }))

        books.forEach(book =>{

            // create html elements to display the data
            const container = document.createElement('div')
            const h4 = document.createElement('h4')
            const bookImg = document.createElement('img')
            const authorsDiv = document.createElement('div')
            const hoverImgCon = document.createElement('div')
            const hoverImg = document.createElement('img')

            
            const resultSec = document.querySelector('#book-result')

            h4.innerText = book.title
            bookImg.src = book.image

            hoverImg.src = '../image/add.png'
            
            const authors = Array(book.authors)
            if(authors[0]){
                  authors[0].forEach(author => {
                    const p = document.createElement('span')

                    p.innerText = author  
                    p.classList.add('author')
                    authorsDiv.appendChild(p)
                    
                
                })
            }else{
                const p = document.createElement('span')

                p.innerText = 'No authors available'
                authorsDiv.appendChild(p)
            }
            // add them to the book result section
            resultSec.appendChild(container)
            container.appendChild(bookImg)
            container.appendChild(h4)
            container.appendChild(authorsDiv)
            hoverImgCon.appendChild(hoverImg)
            container.appendChild(hoverImgCon)
            hoverImgCon.classList.add('hoverImg')
            container.classList.add('book')
            authorsDiv.classList.add('book-authors')
            bookImg.classList.add('bookImg')
            h4.classList.add('add-book-title')

            container.addEventListener('click', async() => {
                hoverImg.src = ''

                const formData = {
                        title: book.title,
                        author: book.authors,
                        image: book.image
                    } 

                console.log(formData)
                let res = await fetch('/books/createBook',{
                    method: 'POST',
                    headers: {
                    //   'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body:  JSON.stringify(formData)
                });
                addBookContainer.style.display = 'none'
                window.location.reload()
                console.log(res)
            
               
              
               
            })

            
        })


        
        
    })
    
})


