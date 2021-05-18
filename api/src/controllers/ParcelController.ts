import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Parcel } from '../models/Parcel';

class ParcelController {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create(req: Request, res: Response) {
    const { quantity } = req.body;
    // repository
    const parcelRepository = getRepository(Parcel);

    // check email duplicate
    const parcelAlreadyExists = await parcelRepository.findOne({
      quantity,
    });
    if (parcelAlreadyExists) {
      return res.status(400).json({
        error: 'parcela já cadastrada',
      });
    }
    // end email duplicate
    const parcel = parcelRepository.create({
      quantity,
    });
    await parcelRepository.save(parcel);
    return res.json(parcel);
  }
}

export { ParcelController };
