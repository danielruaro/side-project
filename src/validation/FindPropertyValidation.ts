import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const findPropertySchema = Joi.object({
  id: Joi.number().required()
});

export function validateFindProperty(req: Request, res: Response, next: NextFunction) {
  const { error } = findPropertySchema.validate(req.params);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
}
