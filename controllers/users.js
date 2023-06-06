const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");

const getAllUsers = async(req,res)=>{
    const queryObject = {};
    const {name,number} = req.query;

    //filters
    if(name)
        queryObject.name = {$regex: name, $options: "i"}
    if(number){
        if(number === 0)
            throw new BadRequestError("Number field can not be empty")
        //Exact number lenth equal 8
        queryObject.number = {"$eq":number}
        //When number lenth less than 8
        if(number.toString().length < 8){
            const zeroToAdd = 8 - number.length 
            const lowerLimit = number * 10 ** zeroToAdd
            const upperLimit = (Number(number) + 1) * 10 ** zeroToAdd
            console.log(lowerLimit+"="+upperLimit)
            queryObject.number = {"$gte":lowerLimit, "$lt":upperLimit}
        }
        
    }
        
    let result = User.find(queryObject)
    
    //sort
    result = result.sort("createAt")

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    result = result.limit(limit).skip(limit*(page-1));

    //execution 
    const users = await result;
    res.status(StatusCodes.OK).json({users,length: users.length});
}

const getUser = async (req,res)=>{
    const user = await User.findOne({_id: req.params.id})
    if(!user)
        throw new NotFoundError(`No user with id ${req.params.id}`)
    
    res.status(StatusCodes.OK).json(user)
}

const updateUser = async (req,res)=>{
    const {name,number} = req.body
    if(!name || !number || name=="" || number=="")
        throw new BadRequestError("Name and Number fields can not be empty")

    const user = await User.findOneAndUpdate({_id: req.params.id},req.body,{
        new: true,
        runValidators: true
    })
    
    if(!user)
        throw new NotFoundError(`No user with id ${req.params.id}`)

    res.status(StatusCodes.OK).json(user)
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser
}