import express from 'express';
import bodyParser from 'body-parser';
import { PropertyService } from '../services';
import { validateCreateProperty } from '../validation/CreatePropertyValidation';
import { validatUpdateProperty } from '../validation/UpdatePropertyValidation';
import { validateListProperty } from '../validation/ListPropertyValidation';
import { validateFindProperty } from '../validation/FindPropertyValidation';
import { validateDeleteProperty } from '../validation/DeletePropertyValidation';

export const propertyRoutes = express.Router();

propertyRoutes.use(bodyParser.json());

const propertyService = new PropertyService();

propertyRoutes.get('/', validateListProperty, propertyService.getAll);

propertyRoutes.get('/:id', validateFindProperty, propertyService.getOneById);

propertyRoutes.post('/', validateCreateProperty, propertyService.create);

propertyRoutes.put('/:id', validatUpdateProperty, propertyService.update);

propertyRoutes.delete('/:id', validateDeleteProperty, propertyService.delete);
