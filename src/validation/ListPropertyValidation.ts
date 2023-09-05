import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const listPropertySchema = Joi.object({
  address: Joi.string().optional(),
  bedrooms: Joi.number().optional(),
  bathrooms: Joi.number().optional(),
  price: Joi.number().optional(),
  type: Joi.string().optional(),
  page: Joi.number().min(1).optional(),
  pageSize: Joi.number().min(1).optional(),
});

export function validateListProperty(req: Request, res: Response, next: NextFunction) {
  const { error } = listPropertySchema.validate(req.query);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
