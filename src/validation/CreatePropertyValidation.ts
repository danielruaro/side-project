import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

const createPropertySchema = Joi.object({
  address: Joi.string().required(),
  bedrooms: Joi.number().required(),
  bathrooms: Joi.number().required(),
  price: Joi.number().required(),
  type: Joi.string().required(),

});


export function validateCreateProperty(req: Request, res: Response, next: NextFunction) {
  const { error } = createPropertySchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
