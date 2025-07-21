import express from 'express'
const router=express.Router();
import { getOneController, getAllController,postController,putController,deleteController } from '../controllers/contactController.js';
import { validateToken } from '../middleware/validateToken.js';

router.use(validateToken);//middleware
router.route("/").get(getAllController).post(postController)
router.route("/:id").get(getOneController).put(putController).delete(deleteController)

export default router;