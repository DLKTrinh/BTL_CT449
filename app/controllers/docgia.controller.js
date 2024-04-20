const MongoDB = require("../utils/mongodb.util");
const DocGiaService = require("../services/docgia.service");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name){
        return next(new ApiError(400,"Name can not be empty"));
    }

    try{
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.create(req.body);
        return res.send(document);
    } catch(error){
        console.log(error)
        return next(
            new ApiError(500,"An error occured while creating the DocGia")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let document = [];

    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const {name} = req.query;
        if(name) {
            documents = await docgiaService.findByName(name);
        } else {
            documents = await docgiaService.find({});
        }
    } catch(error) {
        return next(
            new ApiError(500, "An error has occured while retrieving DocGias")
        );
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try{
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404,"DocGia not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving DocGia with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length ===0){
        return next(new ApiError(400,"Data to update can not be empty"));
    }

    try{
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "DocGia not found"));
        }
        return res.send({ message:"DocGia wasupdate successfully"});
    } catch(error){
        return next(
            new ApiError(500, `Error updating DocGia with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try{
        const docgiaService = new DocGiaService(MongoDB.client);
        const document = await docgiaService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404,"DocGia not found"));
        }
        return res.send({ message: "DocGia was deleted successfully"});
    } catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete DocGia with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res) => {
    try {
        const docgiaService = new DocGiaService(MongoDB.client);
        const deleteCount = await docgiaService.deleteAll();
        return res.send({
            message: `${deleteCount} DocGias were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while removing all DocGias")
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try{
        const docgiaService = new DocGiaService(MongoDB.client);
        const documents = await docgiaService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occured while retrieving favorite DocGias"
            )
        );
    }
};
