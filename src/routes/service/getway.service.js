const repo = new (require('../../database/repositories/getway.repo'))();
const mongoose = require('mongoose');
const { OpError } = require('../../../helpers/error-handler')
module.exports = class getwayService {
    constructor() { }
    async create(_data) {
        try {
            return await repo.create(_data);
        } catch (_err) {
            throw _err;
        }
    }
    async list(_data) {
        try {
            return await repo.list(_data, "-__v");
        } catch (_err) {
            throw _err;
        }
    }
    async getById(_id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(_id))
                throw new OpError(400, 'Getway id is not valid');
            const res = await repo.findOne({ _id: _id }, "-__v");
            if (!res)
                throw new OpError(404, 'Getway not found');
            return res;
        } catch (_err) {
            throw _err;
        }
    }
    async update(_id, _data) {
        try {
            return await repo.update({ _id: _id }, _data, "-__v");
        } catch (_err) {
            throw _err;
        }
    }
    async delete(_id) {
        try {
            await this.getById(_id);
            await repo.delete({ _id: _id });
            return { code: 200, status: 'success', message: 'Getway deleted successfully' };
        } catch (_err) {
            throw _err;
        }
    }

    async addDevices(_id, _data) {
        try {
            await this.getById(_id);
            return await repo.update({ _id }, { $addToSet: { devices: { $each: _data.devices } } }, "-__v");
        } catch (_err) {
            throw _err;
        }
    }

    async removeDevices(_id, _data) {
        try {
            await this.getById(_id);
            return await repo.update({ _id }, { $pull: { devices: { $in: _data.devices } } }, "-__v");
        } catch (_err) {
            throw _err;
        }
    }

    async getDevices(_id) {
        try {
            const res = await this.getById(_id);
            return { devices: res.devices };
        } catch (_err) {
            throw _err;
        }
    }
}