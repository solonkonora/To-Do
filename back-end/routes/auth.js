import { Router } from "express";
import { SignupHandler, LoginHandler, GetCurrentUser } from "../modules/auth/auth.controller.js";

const router = Router();

router.post("/signup", SignupHandler);

router.post("/login", LoginHandler);

router.get("/current-user", GetCurrentUser);

export default router;