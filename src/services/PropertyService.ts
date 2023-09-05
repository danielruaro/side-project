import { Request, Response } from "express";
import { Property } from "../entities";


import AppDataSource from '../dataSource';


const ITEMS_PER_PAGE = 10;
export class PropertyService {

    async getAll(req: Request, res: Response) {

        try {
            const page = req.query.page ? Number(req.query.page) : 1;

            const pageSize = req.query.pageSize ? Number(req.query.pageSize) : ITEMS_PER_PAGE;

            const skip = (page - 1) * pageSize

            const propertyRepository = AppDataSource.manager.getRepository(Property);
            const queryBuilder = await propertyRepository.createQueryBuilder('property').skip(skip).take(pageSize)


            const { address, price, bedrooms, bathrooms, type } = req.query;

            if (address) {
                queryBuilder.andWhere('property.address LIKE :address', {
                    address: `%${address}%`,
                });
            }

            if (type) {
                queryBuilder.andWhere('property.type LIKE :type', {
                    type: `%${type}%`,
                });
            }

            if (price) {
                queryBuilder.andWhere('property.price = :price', {
                    price: `${price}`,
                });
            }

            if (bedrooms) {
                queryBuilder.andWhere('property.bedrooms = :bedrooms', {
                    bedrooms: `${bedrooms}`,
                });
            }

            if (bathrooms) {
                queryBuilder.andWhere('property.bathrooms = :bathrooms', {
                    bathrooms: `${bathrooms}`,
                });
            }

            const properties = await queryBuilder.getMany();

            return res.json({ data: properties, pagination: { page, pageSize } });
        } catch (e) {
            return res.status(500).json({ error: 'Failed to retrieve properties', e });
        }


    }

    async getOneById(req: Request, res: Response) {
        try {

            const id = Number(req.params.id);

            const propertyRepository = AppDataSource.manager.getRepository(Property);
            const property = await propertyRepository.findOneBy({ id });

            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }

            res.json({ data: { property } });
        } catch (e) {
            return res.status(500).json({ error: 'Failed to retrieve property', e });
        }

    }

    async create(req: Request, res: Response) {
        try {
            const propertyRepository = AppDataSource.manager.getRepository(Property);
            const newProperty = propertyRepository.create(req.body);
            const result = await propertyRepository.save(newProperty);
            return res.status(201).json(result);
        } catch (e) {
            return res.status(500).json({ error: "Failed to create property", e })
        }

    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const propertyRepository = AppDataSource.manager.getRepository(Property);
            const property = await propertyRepository.findOneBy({ id });

            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            } else {
                propertyRepository.merge(property, req.body);
                const result = await propertyRepository.save(property);
                return res.json(result);

            }

        } catch (e) {
            return res.status(500).json({ error: 'Failed to update property', e });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const propertyRepository = AppDataSource.manager.getRepository(Property);
            const property = await propertyRepository.findOneBy({ id });
            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            } else {
                await propertyRepository.remove(property);
                return res.status(204).end();
            }
        } catch (e) {
            return res.status(500).json({ error: 'Failed to delete property', e });
        }
    }

}
