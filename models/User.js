const {model,Schema} = require('mongoose');

const userSchema = new Schema({
    name:{
        type: String,
        required : true,
    },
    email:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true,
    },  
},
{ timestamps:true}//add timestamp server
);

module.exports = model("user",userSchema);//collection ka name diya user aur user export kar diya