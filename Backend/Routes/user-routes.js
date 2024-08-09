import { Router } from "express";
import { register,login,updatePassword, logout,getLikedMovies,addToLikedMovies,removeMovie } from "../Controller/user-controller.js";
import { verifyToken } from "../Utils/jwt.js";
const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updatePassword").post(updatePassword);
router.route("/logout").post(verifyToken,logout);
router.route("/add").post(addToLikedMovies);
router.route("/delete").put(removeMovie);
router.route("/liked/:email").get(getLikedMovies);



export default router;