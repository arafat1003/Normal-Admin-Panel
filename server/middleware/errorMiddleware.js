const errorHandler =(error,req,res,next)=>{
  const statusCode = res.statusCode ? res.statusCode :500
  res.status(statusCode)

  res.json({
    message:error.message,
    stack:process.env.NODE_DEV ==="development" ? error.stack:null
  })

}

module.exports = errorHandler

   