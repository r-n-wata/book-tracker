const Book = require('../models/Book')

module.exports = {
    getBooks: async (req,res)=>{
        console.log(req.user)
        try{
            const bookItems = await Book.find({
                userId:req.user.id,
                reading:false,
                completed:false,
                archive:false
            })
            const itemsLeft = await Book.countDocuments({
                userId:req.user.id,
                archive: false,
                reading: false,
                completed: false
            })

            const booksCompleted = await Book.find({
                userId:req.user.id,
                completed: true,
                archive:false
            })

            const currentlyReading = await Book.find({
                userId:req.user.id,
                reading: true,
                archive:false
            })


            // const todosArchived = await Todo.find({
            //     userId:req.user.id,
            //     archive: true
            // })
            
            
            res.render('books.ejs', {
                books: bookItems, 
                left: itemsLeft, 
                reading: currentlyReading,
                completed: booksCompleted,
                user: req.user
            })

            console.log(booksCompleted)

            console.log(req.user)
        }catch(err){
            console.log(err)
        }
    },

    createBook: async (req, res)=>{
        try{
            await Book.create({
                // bookId: req.body.bookId,
                title: req.body.title,
                author: req.body.author,
                image: req.body.image,
                completed: false, 
                archive: false,
                reading: false,
                userId: req.user.id
            })
            console.log('Book has been added!')
            res.redirect('/books')
        }catch(err){
            console.log(err)
        }
    },

    markReading: async (req, res) =>{
        try{
            await Book.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                reading: true,
            })
            console.log('Moved to reading')
            res.json('Moved to reading')
        }catch(err){
            console.log(err)
        }
    },

    markArchive: async (req, res) =>{
        try{
            await Book.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                archive: true,
                completed: false
            })
            console.log('Mark archive')
            res.json('Mark archive')
        }catch(err){
            console.log(err)
        }
    },

    unmarkArchive: async (req, res) =>{
        try{
            await Book.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                archive: false,
            })
            console.log('Unmark archive')
            res.json('Unmark archive')
        }catch(err){
            console.log(err)
        }
    },

    markComplete: async (req, res)=>{
        try{
            await Book.findOneAndUpdate({
                _id:req.body.bookIdFromJSFile
            },{
                completed: true,
                reading: false
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    unmarkComplete: async (req, res)=>{
        try{
            await Book.findOneAndUpdate({_id:req.body.bookIdFromJSFile},{
                completed: false,
                reading: true
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteBook: async (req, res)=>{
        console.log(req.body.bookIdFromJSFile)
        try{
            await Book.findOneAndDelete({_id:req.body.bookIdFromJSFile})
            console.log('Deleted Book')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}  