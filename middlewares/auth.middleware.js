const jwt = require("jsonwebtoken")

module.exports =  (req,res,next) => {
    const token = (req.headers.authorization || '' ).replace(/Bearer\s?/, '');

        if(token) {
            try {
                const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
                req.userId = decoded.id;
                next();
            } catch (e){
                 return res.status(403).json('Нет доступа')
            }
        } else {
           return  res.status(403).json('Нет токена')
        }
}
