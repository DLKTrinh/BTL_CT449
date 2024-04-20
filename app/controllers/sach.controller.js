const MongoDB = require("../utils/mongodb.util");
const SachService = require("../services/sach.service");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name){
        return next(new ApiError(400,"Name can not be empty"));
    }

    try{
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.create(req.body);
        return res.send(document);
    } catch(error){
        console.log(error)
        return next(
            new ApiError(500,"An error occured while creating the ")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let document = [];

    try {
        const sachService = new SachService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await sachService.findByName(name);
        } else {
            documents = await sachService.find({});
        }
    } catch(error) {
        return next(
            new ApiError(500, "An error has occured while retrieving ")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try{
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404," not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length ===0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }

    try{
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, " not found"));
        }
        return res.send({ message:" wasupdate successfully"});
    } catch(error){
        return next(
            new ApiError(500, `Error updating with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try{
        const sachService = new SachService(MongoDB.client);
        const document = await sachService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404," not found"));
        }
        return res.send({ message: " was deleted successfully"});
    } catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete  with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const deleteCount = await sachService.deleteAll();
        return res.send({
            message: `${deleteCount}  were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while removing all ")
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try{
        const sachService = new SachService(MongoDB.client);
        const documents = await sachService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occured while retrieving favorite "
            )
        );
    }
};
