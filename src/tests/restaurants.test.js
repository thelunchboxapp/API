// tests/restaurants.test.js



const request = require('supertest');
const app = require('../server.js');


describe('Restaurants Endpoints', () => {
  
  it('should fetch all restaurants', async () => {
    const res = await request(app).get('/api/restaurants');
    
    // Check if the response status is 200 (OK)
    expect(res.statusCode).toEqual(200);
    
    // Check if the response body is an array
    expect(Array.isArray(res.body)).toBeTruthy();
    
    // Check if the first item in the array has certain properties
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('address');
      // ... you can add more properties to check
    }
  });

  // Example: Test fetching a single restaurant
  it('should fetch a single restaurant', async () => {
    const res = await request(app).get('/api/restaurants/1'); // Assuming 1 is a valid ID
    
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body).toBe('object');
    expect(res.body).toHaveProperty('name');
    // ... you can add more properties to check
  });

  // ... Add more tests as needed

});
