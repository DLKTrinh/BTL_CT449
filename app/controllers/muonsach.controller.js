const MongoDB = require("../utils/mongodb.util");
const MuonSachService = require("../services/muonsach.service");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name){
        return next(new ApiError(400,"Name can not be empty"));
    }

    try{
        const muonsachService = new MuonSachService(MongoDB.client);
        const document = await muonsachService.create(req.body);
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
        const muonsachService = new MuonSachService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await muonsachService.findByName(name);
        } else {
            documents = await muonsachService.find({});
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
        const muonsachService = new MuonSachService(MongoDB.client);
        const document = await muonsachService.findById(req.params.id);
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
        const muonsachService = new MuonSachService(MongoDB.client);
        const document = await muonsachService.update(req.params.id, req.body);
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
        const muonsachService = new MuonSachService(MongoDB.client);
        const document = await muonsachService.delete(req.params.id);
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
        const muonsachService = new MuonSachService(MongoDB.client);
        const deleteCount = await muonsachService.deleteAll();
        return res.send({
            message: `${deleteCount}  were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while removing all ")
        );
    }
};
