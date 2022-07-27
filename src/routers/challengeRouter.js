import challenge from "../controllers/challengeController";

const { Router } = require("express");
const router = Router();

router.get("/", challenge.getChallenge);
router.put("/", challenge.editChallenge);

export default router;