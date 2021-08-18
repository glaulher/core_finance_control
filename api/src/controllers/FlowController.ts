import { getCustomRepository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { FlowRepository } from '../repositories/FlowRepository';
import { UsersRepository } from '../repositories/UsersRepository';

import { Parcel } from '../models/Parcel';
import { Category } from '../models/Category';
import { CashInfusion } from '../models/CashInfusion';

interface RequestDTO {
  email: string;
  quantity: number;
  category: string;
  cash_infusion: number;

  cash: number;
  description: string;
  date: Date;
}
interface RequestFlow {
  id_cash_infusion: string;
  id_category: string;
  id_user: string;
  id_parcel: string;
  cash: number;
  description: string;
  date: Date;
}

interface findFlow {
  id: string;
}

class FlowController {
  async create({
    email,
    quantity,
    category,
    cash_infusion,
    cash,
    description,
    date,
  }: RequestDTO): Promise<RequestFlow> {
    // repository
    const usersRepository = getCustomRepository(UsersRepository);
    const parcelRepository = getRepository(Parcel);
    const categoryRepository = getRepository(Category);
    const cashInfusionRepository = getRepository(CashInfusion);

    const flowRepository = getCustomRepository(FlowRepository);

    const userAlreadyExists = await usersRepository.findOne({
      where: { email },
    });

    if (!userAlreadyExists) {
      throw new Error('Usuário não existe.');
    }

    const parcelAlreadyExists = await parcelRepository.findOne({
      quantity,
    });

    if (!parcelAlreadyExists) {
      throw new Error('Parcela não existe.');
    }

    const categoryAlreadyExists = await categoryRepository.findOne({
      category,
    });

    if (!categoryAlreadyExists) {
      throw new Error('Categoria não existe.');
    }
    const cashInfusionAlreadyExists = await cashInfusionRepository.findOne({
      cash_infusion,
    });

    const flow = flowRepository.create({
      id_cash_infusion: cashInfusionAlreadyExists.id,
      id_category: categoryAlreadyExists.id,
      id_user: userAlreadyExists.id,
      id_parcel: parcelAlreadyExists.id,
      cash,
      description,
      date,
    });
    await flowRepository.save(flow);
    return flow;
  }

  async show(): Promise<Array<RequestFlow>> {
    const flowRepository = getCustomRepository(FlowRepository);
    const all = await flowRepository.find();

    return all;
  }

  async getFindOne(id: findFlow): Promise<findFlow> {
    const flowRepository = getCustomRepository(FlowRepository);

    const getOne = await flowRepository.findOne(id, {
      relations: ['cash_infusion', 'category', 'user', 'parcel'],
    });

    if (!getOne) {
      throw new Error('Fluxo não encontrado');
    }
    return getOne;
  }

  async deleteFlow(id: findFlow): Promise<void> {
    const flowRepository = getCustomRepository(FlowRepository);

    const getFlow = await flowRepository.findOne(id);

    if (!getFlow) {
      throw new Error('Fluxo não encontrado');
    }
    await flowRepository.delete(id);
  }

  async updateFlow(request: Request, response: Response) {
    const { id } = request.params;
    const flowRepository = getCustomRepository(FlowRepository);
    const getFlow = await flowRepository.findOne(id);

    if (getFlow) {
      flowRepository.merge(getFlow, request.body);
      const results = await flowRepository.save(getFlow);
      return response.json(results);
    }
    return response.status(404).json({ mensagem: 'deu ruim' });
  }
}

export { FlowController };
