import { NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { CashInfusion } from '../models/CashInfusion';

interface RequestDTO {
  cash_infusion: number;
  sum: number;
  next: NextFunction;
}

const insertInfusion = async ({ next }: RequestDTO): Promise<void> => {
  const sum = (X: number, Y: number) => X + Y;

  let cash_infusion = 0;

  const cashInfusionRepository = getRepository(CashInfusion);
  const cashInfusion = cashInfusionRepository.create({
    cash_infusion,
  });
  const cashInfusionAlreadyExists = await cashInfusionRepository.findOne({
    cash_infusion,
  });
  if (!cashInfusionAlreadyExists) {
    await cashInfusionRepository.save(cashInfusion);

    if (cash_infusion === 0) {
      cash_infusion = sum(cash_infusion, 1);

      await cashInfusionRepository.save(
        cashInfusionRepository.create({
          cash_infusion,
        }),
      );
    }
  }

  next();
};

export { insertInfusion };
