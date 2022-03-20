const request = require('supertest');
const { User } = require('../../models/users');
const { Genres } = require('../../models/genres');

let server;

describe('auth middleware', () => {
    beforeEach(() => { server = require('../../index');  });
    afterEach(async () => {  
        await Genres.remove({});  
        await server.close(); 
    });

    let token;

    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1'})
    };

    beforeEach(() => {
        token = new User().generateAuthToken();
    });

    it('should return a 401 error if no token is provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return a 400 error for an invalid token', async () => {
        token = 'a';

        const res = await exec();

        expect(res.status).toBe(400);
    })
})