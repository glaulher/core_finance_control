import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { ParcelController } from './controllers/ParcelController';
import { CategoryController } from './controllers/CategoryController';
import { FlowController } from './controllers/FlowController';
import { insertInfusion } from './middlewares/insertCashInfusion';

const router = Router();
const userController = new UserController();
const parcelController = new ParcelController();
const categoryController = new CategoryController();
const flowController = new FlowController();

router.post('/user', insertInfusion);
router.post('/user', async (request, response) => {
  try {
    const { user_name, email } = request.body;

    const user = await userController.create({ user_name, email });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

router.post('/flow/parcel', async (request, response) => {
  try {
    const { quantity } = request.body;

    const parcel = await parcelController.create({ quantity });

    return response.json(parcel);
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

router.post('/flow/category', async (request, response) => {
  try {
    const { category } = request.body;

    const categories = await categoryController.create({ category });

    return response.json(categories);
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

router.post('/flow', async (request, response) => {
  try {
    const {
      email,
      quantity,
      category,
      cash_infusion,
      cash,
      description,
      date,
    } = request.body;

    const flow = await flowController.create({
      email,
      quantity,
      category,
      cash_infusion,
      cash,
      description,
      date,
    });

    return response.json(flow);
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

router.get('/flow', async (_request, response) => {
  const flow = await flowController.show();
  return response.json(flow);
});

router.get('/flow/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const getOne = await flowController.getFindOne({ id });
    return response.status(200).json(getOne);
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

router.delete('/flow/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await flowController.deleteFlow({ id });
    return response.status(200).json({ message: 'Fluxo deletado' });
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});
router.put('/flow/:id', flowController.updateFlow);

export { router };
