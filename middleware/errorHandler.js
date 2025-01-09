import CustomError from "../utils/customError.js";

const errorHandler = (err, req, res, next) => {
console.error(err.stack);

    let customErr = {...err};
    customErr.message = err.message;

    //check for Mongoose Validation Errors
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
        .map(val => val.message)
        .join(', ');
        customErr = new CustomError(message, 400);
    }


// Check for MongoDB cast Error 
if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    customErr = new CustomError(message, 404);
}

// Handle the case where no specific error was matched
if (!(customErr instanceof CustomError)) {
    customErr = new CustomError('Something went wrong', 500);
}

res.status(CustomError.statusCode || 500).json({
    success: false,
    message: CustomError.message || 'server Error',
});
};


export default errorHandler;