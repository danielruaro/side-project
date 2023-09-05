import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const updatePropertySchema = Joi.object({
  address: Joi.string().required(),
  bedrooms: Joi.number().required(),
  bathrooms: Joi.number().required(),
  price: Joi.number().required(),
  type: Joi.string().required(),
  id: Joi.number().required(),
});

export function validatUpdateProperty(req: Request, res: Response, next: NextFunction) {
  const { error } = updatePropertySchema.validate({ ...req.body, ...req.params });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}