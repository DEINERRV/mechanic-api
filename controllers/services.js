const Service = require("../models/Service");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, NotFoundError} = require("../errors");

const getAllServices = async (req,res)=>{
    const services = await Service.find()
    res.status(StatusCodes.OK).json({services, count: services.length});
}

const getService = async (req,res)=>{
    const service = await Service.findOne({_id: req.params.id})
    if(!service)
        throw new NotFoundError(`No service with id ${req.params.id}`)
    
    res.status(StatusCodes.OK).json(service)
}

const createService = async (req,res)=>{
    const service = await Service.create(req.body)
    res.status(StatusCodes.CREATED).json(service)
}

const updateService = async (req,res)=>{
    const {name} = req.body
    if(!name ||  name=="")
        throw new BadRequestError("Name field can not be empty")

    const service = await Service.findOneAndUpdate({_id: req.params.id},req.body,{
        new: true,
        runValidators: true
    })
    
    if(!service)
        throw new NotFoundError(`No service with id ${req.params.id}`)

    res.status(StatusCodes.OK).json(service)
}

//Con posibles errore por no borrar los objetos que lo contienen
const deleteService = async (req,res)=>{
    const service = await Service.findOneAndDelete({_id: req.params.id})
    if(!service)
        throw new NotFoundError(`No service with id ${req.params.id}`)

    res.status(StatusCodes.OK).json(service)
}

module.exports = {
    getAllServices,
    getService,
    createService,
    updateService,
    deleteService
}