module.exports = {
    OpError: class OpError extends Error {
        constructor(_statusCode, _message) {
            super(_message);
            this.statusCode = _statusCode;
            this.status = `${_statusCode}`.startsWith('4') ? 'Fail' : 'Error';
            this.message = _message;
            this.isOperational = true;
        }
    },
    errorHandler: (err, req, res, next) => {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'Error';
        err.message = err.message || 'Something went wrong';
        if (err.code === 11000) {
            const message = Object.keys(err.keyValue).map(key => `${key} ${err.keyValue[key]} already exists`);
            return res.status(400).json({ code: 400, status: 'Fail', message });
        } else if (err.errors && Object.keys(err.errors).length > 0) {
            const errorsMsgs = [];
            Object.keys(err.errors).forEach((key) => {
                errorsMsgs.push(err.errors[key].message || err.errors[key]);
            });
            return res.status(err.statusCode).json({ code: err.statusCode, status: err.status, message: errorsMsgs });
        } else
            return res.status(err.statusCode).json({ code: err.statusCode, status: err.status, message: err.message });
    }
};