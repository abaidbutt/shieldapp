const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const MongoDB = async () =>{
     try{
      await  mongoose.connect(process.env.MONGODB_URL,
       {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify:false});
          console.log("successfully connect with databse");
     }catch(error){
       console.log("error Found ", error);
     }
}


module.exports = MongoDB



