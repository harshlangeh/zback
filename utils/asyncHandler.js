


// 

// const asyncHandler = (requestHandler) => {(req, res, next) => {Promise.resolve(requestHandler(req, res, next)).catch((err) => {next(err)})}}
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))
        .catch((err) => {next(err)})
    }
}

export {asyncHandler}




// const asyncHandler = (func) => { async (func2) => {}}
// const asyncHandler = (func) =>  async (func2) => {}


    // const asyncHandler = (fn) =>  async (req, res, next) => {
    //     try {
    //         await fn(req, res, next)
    //     } catch (error) {
    //         res.status(error.code || 500).json({
    //             success: false,
    //             message: error.message
    //         })
    //     }
    // }








