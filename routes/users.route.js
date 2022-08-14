const { Router }  = require('express');
const { userController } = require('../controllers/user.controller')
const  authMiddleware  = require('../middlewares/auth.middleware')
const User = require("../models/User.model");
const jwt = require('jsonwebtoken');
const multer  = require("multer")
const router = Router();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({storage})

router.get("/users", userController.getUsers);
router.post("/register", userController.registerUser);
router.patch("/account/", authMiddleware, userController.editUSer);
router.post("/auth", userController.authUser)
router.get("/auth/me", authMiddleware,  userController.getByUserId)
router.post("/upload", upload.single('image'), authMiddleware, async (req,res) => {

    const imageUrl = `uploads/${req.file.originalname}`;

    try {
        const user = await User.findByIdAndUpdate(req.userId, {
            avatarUrl: imageUrl
        })
        res.json(
            "файл загружен"
        )

    } catch (e) {
        console.log(e)
        res.json("ошибка при загрузки файла")
    }

})

module.exports = router;