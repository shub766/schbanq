const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userschema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type: String,
    },
    role: {
        type:String,
        enum : ['user','publisher'],
        default: 'user'
    },
    password: {
        type:String,
        required: [true,'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date,
    createdAt: {
        type: Date,
        dafault: Date.now
    }

});

//Encrypt password using bcrypt
userschema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

//sign JWT and return

userschema.methods.getSignedJWTTOken = function() {
    return jwt.sign({ id: this._id}, 'hshshdy567yf',{ expiresIn: '30d'});
};

//match user entered hashed password in databse 

userschema.methods.matchPassword = async function(enteredpassword) {
    return await bcrypt.compare(enteredpassword,this.password);
}


module.exports = mongoose.model('User',userschema); 