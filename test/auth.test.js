const request = require('supertest');
const app = require('../src/server'); // the express server

    
let token;

beforeAll((done) => {
     request(app)
          .post('/signup')
          .send({
               username: username,
               password: password,
          })
          .end((err, response) => {
               token = response.body.token; // save the token!
               done()
          })
});

describe('GET /test', () => {
     // token not being sent - should respond with a 401
     test('It should require authorization', () => {
     return request(app)
          .get('/test')
          .then((response) => {
               expect(response.statusCode).toBe(500);
          });
     });
     // send the token - should respond with a 200
     test('It responds with JSON', () => {
     return request(app)
          .get('/test')
          .set('Authorization', `Bearer ${token}`)
          .then((response) => {
               expect(response.statusCode).toBe(200);
               expect(response.type).toBe('application/json');
          });
     });
});