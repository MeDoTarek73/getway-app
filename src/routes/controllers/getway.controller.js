const { validate_getway_create, validate_getway_update, validate_getway_devices } = require('./../../../helpers/validator/validator');
const service = new (require('../service/getway.service'))();
const mongoose = require('mongoose');
const { OpError } = require('../../../helpers/error-handler');
module.exports = (_express) => {
    const router = _express.Router();
    // GET ALL GETWAYS
    router.get('/', async (req, res, next) => {
        try {
            const getways = await service.list();
            res.status(200).json(getways);
        } catch (error) {
            next(error);
        }
    });
    // GET GETWAY BY ID
    router.get('/:id', async (req, res, next) => {
        try {
            const getway = await service.getById(req.params.id);
            res.status(200).json(getway);
        } catch (error) {
            next(error);
        }
    });
    // CREATE NEW GETWAY
    router.post('/', async (req, res, next) => {
        try {
            const value = await validate_getway_create(req.body);
            const getway = await service.create(value);
            res.status(200).json(getway);
        } catch (error) {
            next(error);
        }
    });
    // UPDATE GETWAY
    router.put('/:id', async (req, res, next) => {
        try {
            const value = await validate_getway_update(req.body);
            const getway = await service.update(req.params.id, value);
            res.status(200).json(getway);
        } catch (error) {
            next(error);
        }
    });
    // DELETE GETWAY
    router.delete('/:id', async (req, res, next) => {
        try {
            const getway = await service.delete(req.params.id);
            res.status(200).json(getway);
        } catch (error) {
            next(error);
        }
    });
    // ADD DEVICE TO GETWAY OR MULTIPLE DEVICES
    router.put('/:id/devices', async (req, res, next) => {
        try {
            const value = await validate_getway_devices(req.body);
            const getway = await service.addDevices(req.params.id, value);
            res.status(200).json(getway);
        } catch (error) {
            next(error);
        }
    });
    // REMOVE DEVICE FROM GETWAY OR MULTIPLE DEVICES FROM GETWAY
    router.delete('/:id/devices', async (req, res, next) => {
        try {
            const value = await validate_getway_devices(req.body);
            const getway = await service.removeDevices(req.params.id, value);
            res.status(200).json(getway);
        } catch (error) {
            next(error);
        }
    });
    // GET ALL DEVICES OF GETWAY
    router.get('/:id/devices', async (req, res, next) => {
        try {
            const getway = await service.getDevices(req.params.id);
            res.status(200).json(getway);
        } catch (error) {
            next(error);
        }
    });
    return router;
}