import { getRepository } from 'typeorm';
import { Parcel } from '../models/Parcel';

interface RequestDTO {
  quantity: number;
}
class ParcelController {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async create({ quantity }: RequestDTO): Promise<Parcel> {
    // repository
    const parcelRepository = getRepository(Parcel);

    // check parcel
    const parcelAlreadyExists = await parcelRepository.findOne({
      where: { quantity },
    });
    if (parcelAlreadyExists) {
      throw new Error('This quantity is already registered.');
    }
    // end email duplicate
    const parcel = parcelRepository.create({
      quantity,
    });
    await parcelRepository.save(parcel);
    return parcel;
  }
}

export { ParcelController };
