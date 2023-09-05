import request from 'supertest';
import app from '../../app';
import AppDataSource, { seedDb } from '../../dataSource';

describe('propertyRoutes', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await seedDb();
  });

  describe('GET /properties/id', () => {
    it('should return a property', async () => {
      await request(app)
        .get('/properties/1')
        .expect(200)
        .expect('Content-Type', /json/);


    });

    it('should not return property ', async () => {
      const response = await request(app)
        .get('/properties/200')
        .expect(404)
        .expect('Content-Type', /json/);


      const { error } = response.body;
      expect(error).toBe('Property not found');


    });


  });

  describe('GET /properties', () => {
    it('should return 100 properties', async () => {
      const response = await request(app)
        .get('/properties')
        .query({ pageSize: 100 })
        .expect(200)
        .expect('Content-Type', /json/);

      const { data } = response.body;

      expect(data.length).toBe(100);
    });

    it('should return 0 properties', async () => {
      const response = await request(app)
        .get('/properties')
        .query({ page: 999 })
        .expect(200)
        .expect('Content-Type', /json/);

      const { data } = response.body

      expect(data.length).toBe(0);
    });

    it('should return 20 properties from the second page', async () => {
      const response = await request(app)
        .get('/properties')
        .query({ pageSize: 20, page: 2 })
        .expect(200)
        .expect('Content-Type', /json/);

      const parsedData = JSON.parse(response.text);

      expect(parsedData.data.length).toBe(20);
    });

  });

  describe('POST /properties', () => {
    it('should create a property', async () => {

      const newProperty = {
        "address": "endereço",
        "price": 9375751,
        "bedrooms": 2,
        "bathrooms": 1,
        "type": "efsdf"
      }

      const response = await request(app)
        .post('/properties')
        .send(newProperty)
        .expect(201)
        .expect('Content-Type', /json/);

      const { address, price, bedrooms, bathrooms, type } = response.body;

      expect(address).toBe(newProperty.address);
      expect(price).toBe(newProperty.price);
      expect(bedrooms).toBe(newProperty.bedrooms);
      expect(bathrooms).toBe(newProperty.bathrooms);
      expect(type).toBe(newProperty.type);
    });

    it('should return 400 Bad Request error with missing data ', async () => {

      const newProperty = {
        "price": 9375751,
        "bedrooms": 2,
        "bathrooms": 1,
        "type": "efsdf"
      }

      await request(app)
        .post('/properties')
        .send(newProperty)
        .expect(400)
        .expect('Content-Type', /json/);

    });


  });

  describe('PUT /properties', () => {
    it('should update a property', async () => {

      const updateProperty = {
        "address": "addressupdated",
        "price": 9375751,
        "bedrooms": 2,
        "bathrooms": 1,
        "type": "efsdf"
      }



      const response = await request(app)
        .put('/properties/1')
        .send(updateProperty)
        .expect(200)
        .expect('Content-Type', /json/);

      const { address, id } = response.body;

      expect(address).toBe(updateProperty.address);
      expect(id).toBe(1);
    });

    it('should return an error using a invalid property id', async () => {

      const updateProperty = {
        "address": "addressupdated",
        "price": 9375751,
        "bedrooms": 2,
        "bathrooms": 1,
        "type": "efsdf"
      }

      await request(app)
        .put('/properties/abc')
        .send(updateProperty)
        .expect(400)
        .expect('Content-Type', /json/);

    });

    it('should return a not found error ', async () => {

      const updateProperty = {
        "address": "addressupdated",
        "price": 9375751,
        "bedrooms": 2,
        "bathrooms": 1,
        "type": "efsdf"
      }

      const response = await request(app)
        .put('/properties/200')
        .send(updateProperty)
        .expect(404)

      const { error } = response.body;
      expect(error).toBe('Property not found');

    });

  });

  describe('DELETE /properties/id', () => {
    it('should delete a property', async () => {
      await request(app)
        .delete('/properties/1')
        .expect(204)


    });

    it('should return a not found error ', async () => {
      const response = await request(app)
        .delete('/properties/200')
        .expect(404)

      const { error } = response.body;
      expect(error).toBe('Property not found');

    });

  });

});
