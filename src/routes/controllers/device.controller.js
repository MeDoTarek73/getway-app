const { validate_device_create, validate_device_update } = require('./../../../helpers/validator/validator');
const service = new (require('../service/device.service'))();
module.exports = (_express) => {
    const router = _express.Router();
    // GET ALL DEVICES
    router.get('/', async (req, res, next) => {
        try {
            const devices = await service.list();
            res.status(200).json(devices);
        } catch (error) {
            next(error);
        }
    });
    // GET DEVICE BY ID
    router.get('/:id', async (req, res, next) => {
        try {
            const device = await service.getById(req.params.id);
            res.status(200).json(device);
        } catch (error) {
            next(error);
        }
    });
    // CREATE NEW DEVICE
    router.post('/', async (req, res, next) => {
        try {
            const value = await validate_device_create(req.body);
            const device = await service.create(value);
            res.status(200).json(device);
        } catch (error) {
            next(error);
        }
    });
    // UPDATE DEVICE
    router.put('/:id', async (req, res, next) => {
        try {
            const value = await validate_device_update(req.body);
            const device = await service.update(req.params.id, value);
            res.status(200).json(device);
        } catch (error) {
            next(error);
        }
    });
    // DELETE DEVICE
    router.delete('/:id', async (req, res, next) => {
        try {
            const device = await service.delete(req.params.id);
            res.status(200).json(device);
        } catch (error) {
            next(error);
        }
    });
    return router;
}