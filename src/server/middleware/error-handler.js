
const errorHandler = (error, req, res, next) => {
  console.log(error)
  return res
    .status(error.status || 500)
    .json({
      code: error.code || 500,
      message: error.message 
    });
    
}

export default errorHandler  