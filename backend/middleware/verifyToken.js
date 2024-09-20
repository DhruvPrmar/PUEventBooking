const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
    const token = await req.cookies.token;   
    // console.log("Req received for token: ", token) 
    // console.log('Token: ', token)

    if (!token) {
        return res.status(403).json({
            error: true,
            msg: "Unauthorized: No token provided."
        });
    }

    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);
        req.body.admin = decoded; 
        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json({
            error: true,
            msg: "Unauthorized: Invalid token."
        });
    }
}

module.exports = verifyToken;



/** decode data format of admin in req.body.admin */
// {      
//     id: 9,
//     email: '2303031087041@paruluniversity.ac.in',
//     valid_till: '9999-12-30T18:30:00.000Z',
//     valid_from: null,
//     granted_by: 'self',
//     role: 'developer',
//     iat: 1721277034,
//     exp: 255123471634
//   }
  