import express from "express";
import CategoryController from "../controller/category.controller.js";
import ProductController from "../controller/product.controller.js";
import UserController from "../controller/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

const user = "/user";
router.get(`${user}/getProfile`, auth, UserController.getProfile);
router.post(`${user}/register`, UserController.register);
router.post(`${user}/login`, UserController.login);
const product = "/product";
router.post(`${product}/insert`, ProductController.insert);
router.get(`${product}/getAll`, ProductController.getAll);

export default router;
