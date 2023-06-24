const Repair = require("../models/Repair");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");

const getAllRepair = async(req,res)=>{
    const queryObject = {};
    const {vehicle} = req.query;

    //filters
    if(vehicle)
        queryObject.vehicle = {"$eq": vehicle}
        
    let result = Repair.find(queryObject)
    
    //sort
    result = result.sort("createAt")

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    result = result.limit(limit).skip(limit*(page-1));

    //execution 
    const repairs = await result;
    res.status(StatusCodes.OK).json({repairs,length: repairs.length});
}

const getRepair = async (req,res)=>{
    const repair = await Repair.findOne({_id: req.params.id})
        .populate("services")
        .populate("mechanic")
        .populate({path:"vehicle",populate:"owner"})

    if(!repair)
        throw new NotFoundError(`No repair with id ${req.params.id}`)
    
    res.status(StatusCodes.OK).json(repair)
}

const createRepair = async (req,res)=>{
    const repair = await Repair.create(req.body)
    res.status(StatusCodes.CREATED).json(repair)
}

const updateRepair = async (req,res)=>{
    const {description} = req.body
    if(!description || description=="")
        throw new BadRequestError("Description field can not be empty")

    const repair = await Repair.findOneAndUpdate({_id: req.params.id},req.body,{
        new: true,
        runValidators: true
    })
    
    if(!repair)
        throw new NotFoundError(`No repair with id ${req.params.id}`)

    res.status(StatusCodes.OK).json(repair)
}


const deleteRepair = async (req,res)=>{
    const repair = await Repair.findOneAndDelete({_id: req.params.id})
    if(!repair)
        throw new NotFoundError(`No repair with id ${req.params.id}`)

    res.status(StatusCodes.OK).json(repair)
}

module.exports = {
    getAllRepair,
    getRepair,
    createRepair,
    updateRepair,
    deleteRepair
}