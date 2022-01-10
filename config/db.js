const mongoose = require('mongoose');
require('dotenv').config();//Include config file

module.exports = connect = async () => {
    try {
        const response = await mongoose.connect('mongodb+srv://abhinav:abhinav@blogdatabases.ya9w6.mongodb.net/BlogDatabases?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connection Created');
    } catch (error) {
        console.log(error);
    }

}