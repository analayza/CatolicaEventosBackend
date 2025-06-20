import express from "express";
import { createSponsorController } from "../controllers/sponsorController.js";

const route = express.Router();

route.post('/create/:id_event', createSponsorController);

export default route;