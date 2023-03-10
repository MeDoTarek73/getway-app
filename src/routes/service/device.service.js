const repo = new (require('../../database/repositories/device.repo'))();
const mongoose = require('mongoose');
const { OpError } = require('../../../helpers/error-handler')
module.exports = class deviceService {
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
                throw new OpError(400, 'Device id is not valid');
            const res = await repo.findOne({ _id: _id }, "-__v");
            if (!res)
                throw new OpError(404, 'Device not found');
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
            return { code: 200, status: 'success', message: 'Device deleted successfully' };
        } catch (_err) {
            throw _err;
        }
    }
}