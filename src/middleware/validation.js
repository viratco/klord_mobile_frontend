const getObjFromToken = require('../functions/getObjFromToken.js')


const validation = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const obj = await getObjFromToken(token);
        if (!obj?.username) {
            throw Error("Token validation failed");
        }
        req.user_id = obj.user_id;
        next();
    } catch (e) {
        res.status(400).json({ code: 400, message: e?.message });
    }
}

module.exports = validation;