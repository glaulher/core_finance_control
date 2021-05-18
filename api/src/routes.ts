import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { ParcelController } from './controllers/ParcelController';
import { CategoryController } from './controllers/CategoryController';
import { insertInfusion } from './middlewares/insertCashInfusion';

const router = Router();
const userController = new UserController();
const parcelController = new ParcelController();
const categoryController = new CategoryController();

router.post('/user', insertInfusion);
router.post('/user', userController.create);
router.post('/flow/parcel', parcelController.create);
router.post('/flow/category', categoryController.create);

export { router };
