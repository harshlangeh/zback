import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadOnCloudinary}  from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler( async (req,res) => {
    // testing 
    // res.status(200).json({
    //     message : "ok"
    // })

    // steps need to be performed in this function

    // get user details from frontend
    // validation - no empty field
    // check if user already exist : username, email
    // check for images and avatar
    // upload them to cloudinary, avatar check
    // create user object - create entry in DB
    // remove passward and refresh token from response
    // check for user creation
    // return response - ApiResponse.js (Define the strucure of response separately)


    // Step 1.  // get user details from frontend
        // data from, form and JSON can be get from req.body [not the data from url]
            // extracting the data through object destructuring 
                // {fullname, email, username, password} -> from Form fields in frontend

                // req.body - from experss

     const {fullName, email, username, password} = req.body
    //  console.log("email : ", email)


    // Step 2. // validation - no empty field

    // if(fullName == ""){
    //     throw new ApiError(400, "fullName required")   // difficult for large no of fields
    // }

    // Better approach - using some method
    if([fullName, email, username, password].some((field) => (field?.trim() === ""))) {
        throw new ApiError(400, "All fields are required")
    }

    // or make a separeate file for validation and call here - like @ symbol in email, passward strength

    
    
    // Step 3. // check if user already exist : username, email
        // findone, $or;  method by MongoDB
    const existedUser = await User.findOne({  $or: [{username},{email}]  }) 

    if(existedUser) {
        throw new ApiError(409, "username or email already exist")
    }

    // console.log(req.files)


    // .files from multer

    const avatarLocalPath = req.files ?.avatar[0]?.path ;
    // const coverImageLocalPath = req.files ?.coverImage[0]?.path ; -===>>> This code might give some error as we are not doing additional checking it like avatar - so, we chage the code using better approach by traditional if else

    let coverImageLocalPath;

    if (req.files && Array.isArray( req.files.coverImage) && req.files.coverImage.length > 0 ) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    
    
    // additional check for avatar
    if(!avatarLocalPath){
        throw new ApiError(400, "avatar is required")
    }




    // Step 4. // // upload them to cloudinary, avatar check

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

     // again additional check for avatar - uploaded or not
     if(!avatar){
        throw new ApiError(400, "avatar is required")
    }



    // Step 5. // create user object - create entry in DB
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })


    //Step 6. // check for user creation
        // .select => '-' means not required // use space to add multiple values
    const createdUser = await User.findById(user._id).select( "-password -refreshToken" )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    //Step 7. // return response - ApiResponse.js
    return res.status(201).json( new ApiResponse(200, createdUser, "User Registered Successfully"))




    
    

})


export {registerUser}