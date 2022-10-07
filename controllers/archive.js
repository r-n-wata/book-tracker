const Book = require('../models/Book')

module.exports = {
    getBooks: async (req,res)=>{
        console.log(req.user)
        try{

            const bookArchived = await Book.find({
                userId:req.user.id,
                // archive: true
            })
            
            
            res.render('archive.ejs', {
                archivedTodos: bookArchived,
                user: req.user
            })
            
        }catch(err){
            console.log(err)
        }
    }
}  