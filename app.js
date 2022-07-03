const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://shubhamsingh:ae8zJE1xH45irSnt@cluster0.ft74rpa.mongodb.net/?retryWrites=true&w=majority';

const app = express();
mongoose.connect(url,{useNewUrlParser:true});
const con = mongoose.connection;

app.use(express.json());
app.use('uploads',express.static('uploads'));

con.on('open',() => {
    console.log('connected........')
});

const booksrouters = require('./routes/books');
app.use('/books',booksrouters);

const userrouters = require('./routes/auth');
app.use('/auth',userrouters);

app.listen(9000,() => {
    console.log('server started');
})