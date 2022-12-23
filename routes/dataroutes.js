import express from "express";
import { getcsvdata } from "../controller/datacontroller.js";
const router = express.Router();
router.route("/csvdata").get(getcsvdata);
export default router;