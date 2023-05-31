const Vehicle = require("../models/Vehicle");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");


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
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
}