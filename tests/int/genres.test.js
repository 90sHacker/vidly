const request = require('supertest');
const {Genres} = require('../../models/genres');
const { User } = require('../../models/users');

let server;

describe('/api/genres', () => {
    beforeEach(() => { 
        server = require('../../index'); 
    });
    afterEach(async () => { 
        await Genres.remove({}) //remove all genres
        await server.close(); //close the server
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genres.insertMany([
                {name: 'genre1'},
                {name: 'genre2'}
            ]);

            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if a valid id is passed', async () => {
            const genre = new Genres({ name: 'genre1'});
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 if an invalid id is passed', async () => {
            const res = await request(server).get('/api/genres/1');
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        let token;
        let name;

        beforeEach(() => {
            // we need to login, so generate a user token
            token = new User().generateAuthToken();
            name = 'genre3';
        })

        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name });
        }

        it('should return a 401 error if user is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return a 400 error if genre input is less than 5 characters', async () => {
            name = "1234";

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return a 400 error if genre input is more than 50 characters', async () => {
            name = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save a genre if valid and return it in the response body', async () => {
            const res = await exec();

            const genre = await Genres.findOne({name: 'genre3'});

            expect(res.status).toBe(200);
            expect(genre).not.toBeNull();
            expect(res.body).toHaveProperty('_id') && expect(res.body).toHaveProperty('name', 'genre3');
        });
    })
})