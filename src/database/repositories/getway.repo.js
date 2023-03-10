let model = require("../models/getway.model");
module.exports = class getwayRepo {
    async list(_findObj = {}, _projection = "") {
        try {
            return await model.find(_findObj, _projection).populate('devices');
        } catch (_err) {
            throw _err;
        }
    }
    async findOne(_findObj, _projection = "") {
        try {
            return await model.findOne(_findObj, _projection).populate('devices', "-__v");
        } catch (_err) {
            throw _err;
        }
    }
    async create(_obj) {
        try {
            let newObj = new model(_obj);
            await newObj.save();
            return newObj;
        } catch (_err) {
            throw _err;
        }
    }
    async update(_findObj, _obj, _poject = "") {
        try {
            return await model.findOneAndUpdate(_findObj, _obj, { projection: _poject, new: true })
        } catch (_err) {
            throw _err;
        }
    }
    async delete(_findObj) {
        try {
            return await model.findOneAndRemove(_findObj)
        } catch (_err) {
            throw _err;
        }
    }
}
