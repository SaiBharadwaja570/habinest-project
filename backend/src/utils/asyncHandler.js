// A async handle to handle our asynchronous functions --- removing the need for try catch block in the functions

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};


export { asyncHandler }


