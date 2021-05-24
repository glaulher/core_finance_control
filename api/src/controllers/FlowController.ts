import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Flow } from '../models/Flow';

// interface RequestDTO {
//   id_cash_infusion: string;
//   id_category: string;
//   id_user: string;
//   id_parcel: string;
//   cash: number;
//   description: string;
//   date: Date;
//   req: Request;
//   res: Response;
// }

class FlowController {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // async create({ req, res }: RequestDTO): Promise<Flow> {
  async create(req: Request, res: Response) {
    const {
      id_cash_infusion,
      id_category,
      id_user,
      id_parcel,
      cash,
      description,
      date,
    } = req.body;

    // repository
    const flowRepository = getRepository(Flow);

    const flow = flowRepository.create({
      id_cash_infusion,
      id_category,
      id_user,
      id_parcel,
      cash,
      description,
      date,
    });
    await flowRepository.save(flow);
    return res.json(flow);
  }
}

export { FlowController };
