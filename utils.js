const success=(statusCode,result)=>{
    return{
    status:'ok',
    statusCode,
    result
    }
}
const error=(statusCode,err)=>{
    return{
    status:'error',
    statusCode,
    err
    }
}
module.exports={success,error};