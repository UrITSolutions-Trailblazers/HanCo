const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {

    let token = req.header('x-auth-token');

    if (!token) {
        console.log('Request rejected')
        return res.status(400).send(new Error('User is not authenticated.'))
    }

    try {
        let user = await jwt.verify(token, 'pinki');
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send(error);
    }


}