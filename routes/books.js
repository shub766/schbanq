const express = require('express');
const router = express.Router();
const Books = require('../models/books');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');

    },
    filename: function(req,file,cb){
        cb(null,file.originalname);

    }
}); 

const upload = multer({storage:storage});

router.get('/',async(req,res) => {
    try{
        const books = await Books.find();
        res.json(books);

    }catch(err){
        res.send('Error'+err);
    }
});

router.get('/:id',async(req,res) => {
    try{
        const book = await Books.findById(req.params.id);  
        res.json(book);

    }catch(err){
        res.send('Error'+err);
    }
});

router.post('/',upload.single('image'), async(req,res) => {
    const books = new Books({
        title: req.body.title,
        author: req.body.author,
        image: req.file.path,
        price: req.body.price,
        dateOfPublication: req.body.dateOfPublication,
        chapters: req.body.chapters

    })
    try{
        const booksdata = await books.save();
        res.json(booksdata);

    }catch(err){
        res.send('Error'+err);
    }
});

router.patch('/:id',async(req,res) => {
    try{
        const book = await Books.findById(req.params.id);
        book.title = req.body.author;
        const a1 = await book.save();  
        res.json(a1);

    }catch(err){
        res.send('Error'+err);
    }
});

module.exports = router;