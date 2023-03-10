const request = require('supertest');
require('dotenv').config();
describe('Getway apis', () => {
    let getwayId;
    const newGetway = {
        name: 'test',
        ip: '192.168.1.1',
    };
    describe('POST /getway', () => {
        it('should create a new getway', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send(newGetway);
            getwayId = res.body._id;
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(newGetway.name);
            expect(res.body.ipv4).toEqual(newGetway.ipv4);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('serial_number');
        });

        // add devices to getway
        it('should return 200 and add devices to getway', async () => {
            const devices = await request(`http://localhost:${process.env.PORT}/api`).get('/device');
            const res = await request(`http://localhost:${process.env.PORT}/api`).put(`/getway/${getwayId}/devices`).send({ devices: [devices.body[0]._id] });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('devices');
            expect(res.body.devices).toContain(devices.body[0]._id);
        });

        // get devices from getway
        it('should return 200 and get devices from getway', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get(`/getway/${getwayId}/devices`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('devices');
        });

        // remove devices from getway
        it('should return 200 and remove devices to getway', async () => {
            const devices = await request(`http://localhost:${process.env.PORT}/api`).get('/device');
            const res = await request(`http://localhost:${process.env.PORT}/api`).delete(`/getway/${getwayId}/devices`).send({ devices: [devices.body[0]._id] });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('devices');
            expect(res.body.devices).not.toContain(devices.body[0]._id);
        });

        it('should return 400 bad request error', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send({});
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "name is required",
                "ip is required"
            ]);
        });

        it('should return 400 bad request "name" should be exist', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send({ ip: '192.1.1.1' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "name is required"
            ]);
        });

        it('should return 400 bad request "ipv4" should be exist', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send({ name: 'test' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "ip is required"
            ]);
        });

        it('should return 400 bad request "ipv4" should be valid', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send({ name: 'test', ip: '192.1.1' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "ip must be a valid ip address of one of the following versions [ipv4] with a optional CIDR"
            ]);
        });

        it('should return 400 bad request "ipv4" should be unique', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send({ name: 'test', ip: '' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "ip is not allowed to be empty"
            ]);
        });

        it('should return 400 bad request "name" should not be empty', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send({ name: '', ip: '192.168.1.1' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "name is not allowed to be empty"
            ]);
        });

        it('should return 400 bad request "name" should be string', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send({ name: 123, ip: '192.168.1.1' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "name must be a string"
            ]);
        });

        it('should return 400 bad request "ipv4" should be string', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send({ name: 'test', ip: 123 });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "ip must be a string"
            ]);
        });

        it('should return 400 bad request "serial_number" should not be exist', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send({ name: 'test', ip: '192.168.1.1', serial_number: '123' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "serial_number is not allowed"
            ]);
        });

        it('should return 400 bad request "id" should not be exist', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).post('/getway').send({ name: 'test', ip: '192.168.1.1', id: '123' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "id is not allowed"
            ]);
        });
    });
    describe('GET /getway', () => {
        let firstGetwayId;
        let length;
        it('should return 404 not found error', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get('/getways');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Endpoint not found');
        });

        it('should get all getways', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get('/getway');
            firstGetwayId = res.body[0]._id;
            length = res.body.length;
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        });

        it('should get getway by id', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get(`/getway/${firstGetwayId}`);
            expect(res.statusCode).toEqual(200);
        });

        it('should validate getways length', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get('/getway');
            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toEqual(length);
        });

        it('should return 404 not found error', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get('/getway/5f7a4e9a9b7c9b1d1c7c7c7c');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Getway not found');
        });

        it('should return 400 bad request error', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get('/getway/123');
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Getway id is not valid');
        });
    });
    describe('PUT /getway/:id/devices', () => {
        // add devices to getway
        it('should return 200 and add devices to getway', async () => {
            const devices = await request(`http://localhost:${process.env.PORT}/api`).get('/device');
            const res = await request(`http://localhost:${process.env.PORT}/api`).put(`/getway/${getwayId}/devices`).send({ devices: [devices.body[0]._id] });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('devices');
            expect(res.body.devices).toContain(devices.body[0]._id);
        });

        it('should return 400 bad request "devices" should be exist', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).put(`/getway/${getwayId}/devices`).send({ devices: [] });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "Minimum 1 device required"
            ]);
        });

        it('should return 400 bad request "devices" should be array', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).put(`/getway/${getwayId}/devices`).send({ devices: '123' });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "devices must be an array"
            ]);
        });

        it('should return 400 bad request "devices" should be array of string', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).put(`/getway/${getwayId}/devices`).send({ devices: [123] });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual([
                "devices[0] must be a string"
            ]);
        });
    });
    describe('GET /getway/:id/devices', () => {
        // get devices from getway
        it('should return 200 and get devices from getway', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get(`/getway/${getwayId}/devices`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('devices');
        });
    });
    describe('DELETE /getway/:id/devices', () => {
        // remove devices from getway
        it('should return 200 and remove devices to getway', async () => {
            const devices = await request(`http://localhost:${process.env.PORT}/api`).get('/device');
            const res = await request(`http://localhost:${process.env.PORT}/api`).delete(`/getway/${getwayId}/devices`).send({ devices: [devices.body[0]._id] });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('devices');
            expect(res.body.devices).not.toContain(devices.body[0]._id);
        });
    });
    describe('DELETE /getway', () => {
        it('should return 200 success', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).delete(`/getway/${getwayId}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Getway deleted successfully');
        });

        it('should return 404 not found', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).get(`/getway/${getwayId}`);
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Getway not found');
        });

        it('should return 400 bad request', async () => {
            const res = await request(`http://localhost:${process.env.PORT}/api`).delete('/getway/123');
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toEqual('Getway id is not valid');
        });
    });
});