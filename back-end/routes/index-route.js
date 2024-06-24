import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
    return res.status(200).json("Welcome to our APi. ##ALMIGHTY_REBASE_DEVS")
});

export default router;
