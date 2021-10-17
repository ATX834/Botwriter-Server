import { Router } from "express";
import  {find, findOneBy, create, update, remove } from "../controllers/User"

const router = Router()

router.post("/", create);
router.get("/", find);
router.get("/:username", findOneBy);
router.put("/:username", update);
router.delete("/:username", remove);

export default router;