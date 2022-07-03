const mongoose = require('mongoose')

const bookschema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    image:{
        data:Buffer,
        contentType:String,
        required:false,
    },
    author:{
        type:String,
        required:true,
    },
	dateOfPublication:{
		type:String,
		required:true,
	},
	chapters:[{
		type:String
	}],
	price:{
		type: Number,
		required:true
	}

});

module.exports = mongoose.model('Book',bookschema)