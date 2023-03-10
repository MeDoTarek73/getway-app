const request = require('supertest');
require('dotenv').config();
describe('Device apis', () => {
    let deviceId;
    const newDevice = {
        vendor: 'test',
        status: 'online',
    };
    describe('POST /device', () => {
        it('should create a new device', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/device').send(newDevice);
            deviceId = res.body._id;
            expect(res.statusCode).toEqual(200);
            expect(res.body.vendor).toEqual(newDevice.vendor);
        });

        it('should return 400 bad request error', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/device').send({});
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "vendor is required"
            ]);
        });

        it('should return 400 bad request "vendor" should be exist', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/device').send({ status: 'online' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "vendor is required"
            ]);
        });

        it('should return 400 bad request "vendor" and "status" should be a string', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/device').send({ vendor: 1, status: 1 });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "vendor must be a string",
                "status must be one of [online, offline]",
                "status must be a string"
            ]);
        });

        it('should return 400 bad request status should be string not a number', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/device').send({ vendor: 'test', status: 1 });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "status must be one of [online, offline]",
                "status must be a string"
            ]);
        });

        it('should return 400 bad request "vendor" should be string not number', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/device').send({ vendor: 1, status: 'online' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "vendor must be a string"
            ]);
        });

        it('should return 400 bad request "status" should be "online" or "offline"', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/device').send({ vendor: 'test', status: 'test' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "status must be one of [online, offline]"
            ]);
        });

        it('should return 400 bad "vendor" and "status" should not be empty', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/device').send({ vendor: '', status: '' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "vendor is not allowed to be empty",
                "status must be one of [online, offline]",
                "status is not allowed to be empty"
            ]);
        });

        it('should return 400 bad request "vendor" should not be empty', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/device').send({ vendor: '', status: 'online' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "vendor is not allowed to be empty"
            ]);
        });

        it('should return 400 bad request "status" should not be empty', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/device').send({ vendor: 'test', status: '' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "status must be one of [online, offline]",
                "status is not allowed to be empty"
            ]);
        });
    });
    describe('GET /device', () => {
        let firstDeviceId;
        let length;

        it('should return 404 not found error', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get('/devices');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Endpoint not found');
        });

        it('should get all devices', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get('/device');
            firstDeviceId = res.body[0]._id;
            length = res.body.length;
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });

        it('should get device by id', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get(`/device/${firstDeviceId}`);
            expect(res.statusCode).toEqual(200);
        });

        it('should validate devices length', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get('/device');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toEqual(length);
        });
    });
    describe('DELETE /device', () => {
        it('should delete created device', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).delete(`/device/${deviceId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Device deleted successfully');
        });

        it('should return 404 not found error', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get(`/device/${deviceId}`);
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Device not found');
        });

        it('should return 400 bad request error', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get(`/device/1`);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Device id is not valid');
        });
    });
});