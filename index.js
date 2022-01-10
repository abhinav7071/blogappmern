const express = require('express');
const connect = require('./config/db');
const router  = require('./routes/userRoutes');
const postRoutes  = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bodyParser = require('body-parser');
var cors = require('cors');
const path  = require('path');
require('dotenv').config();//Include config file

const app = express();


/******Connect Mongodb Database******/
connect();
app.use(bodyParser.json());//Post JSON REquest ko get karne k liye

//Include middleware using router/auth.js and we link router files to make route easy
app.use(cors());
/******Define Routes******/
app.use("/",router); 
app.use("/",postRoutes);
app.use("/",profileRoutes); 


/******Define Port******/
const PORT = process.env.PORT || 5300;
/**chheck production environment****/
const production = process.env.NODE_ENV || 'production';
if(production === 'production'){
    app.use(express.static(path.join(__dirname,"/client/build/")));
    app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT,() => {
    console.log('Mern backend run');
});