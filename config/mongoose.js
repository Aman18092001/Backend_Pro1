const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect('mongodb://127.0.0.1:27017/codeial_db');

const db=mongoose.connection;
db.on('error',console.error.bind(console,'error while setup'));
db.once('open',function(){
    console.log('successfully connected to ::MongoDb');
});
module.exports=db;