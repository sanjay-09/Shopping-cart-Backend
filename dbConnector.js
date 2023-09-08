const mongoose=require("mongoose");
const mongoURL="mongodb+srv://vdnh123:yUZeJmibHBvGjYeh@atlascluster.4qkviv9.mongodb.net/?retryWrites=true&w=majority"
module.exports=(()=>{
    mongoose.connect(mongoURL).then(()=>{
        console.log("connected succesfully");
    })
    .catch((err)=>{
        console.log(err);
    });
})