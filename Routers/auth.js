const router=require("express").Router();
const authController=require("../Controllers/authController")
router.post("/login",authController.loginController)
router.post("/signup",authController.SignUpController)
module.exports=router;