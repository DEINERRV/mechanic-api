const Vehicle = require("../models/Vehicle");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");

const getAllVehicle = async(req,res)=>{
    const queryObject = {};
    const {name,plate,owner} = req.query;

    //filters
    if(name)
        queryObject.name = {$regex: name, $options: "i"}
    if(plate){
        if(plate === 0)
            throw new BadRequestError("Plate field can not be empty")
        //Exact plate number lenth equal 6
        queryObject.plate = {"$eq":plate}
        //When plate number lenth less than 8
        if(plate.toString().length < 6){
            const zeroToAdd = 6 - plate.length 
            const lowerLimit = plate * 10 ** zeroToAdd
            const upperLimit = (Number(plate) + 1) * 10 ** zeroToAdd
            console.log(lowerLimit+"="+upperLimit)
            queryObject.plate = {"$gte":lowerLimit, "$lt":upperLimit}
        }
    }
    if(owner)
        queryObject.owner = {"$eq": owner}
        
    let result = Vehicle.find(queryObject).populate({path:"owner",select:"name"})
    
    //sort
    result = result.sort("createAt")

    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    result = result.limit(limit).skip(limit*(page-1));

    //execution 
    const vehicles = await result;
    res.status(StatusCodes.OK).json({vehicles,length: vehicles.length});
}

const getVehicle = async (req,res)=>{
    const vehicle = await Vehicle.findOne({_id: req.params.id})
    if(!vehicle)
        throw new NotFoundError(`No vehicle with id ${req.params.id}`)
    
    res.status(StatusCodes.OK).json(vehicle)
}

const createVehicle = async (req,res)=>{
    const vehicle = await Vehicle.create(req.body)
    res.status(StatusCodes.CREATED).json(vehicle)
}

const updateVehicle = async (req,res)=>{
    const {name,plate} = req.body
    if(!name || !plate || name=="" || plate=="")
        throw new BadRequestError("Name and Plate fields can not be empty")

    const vehicle = await Vehicle.findOneAndUpdate({_id: req.params.id},req.body,{
        new: true,
        runValidators: true
    })
    
    if(!vehicle)
        throw new NotFoundError(`No vehicle with id ${req.params.id}`)

    res.status(StatusCodes.OK).json(vehicle)
}

//Con posibles errore por no borrar los objetos que lo contienen
const deleteVehicle = async (req,res)=>{
    const vehicle = await Vehicle.findOneAndDelete({_id: req.params.id})
    if(!vehicle)
        throw new NotFoundError(`No vehicle with id ${req.params.id}`)

    res.status(StatusCodes.OK).json(vehicle)
}

module.exports = {
    getAllVehicle,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
}