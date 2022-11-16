const {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} = require('@jest/globals');
const request = require('supertest');
const mongoose = require('../src/config/mongoose');
const ShortenedUrl = require('../src/models/shortenedUrl');
const status = require('../src/constants/status');
const app = require('../src/server');

describe('Test cases for the endpoint to generate a shortened URL', () => {
  beforeEach(async () => {
    await mongoose.connect({ hideLogs: true });
  });

  it('Return status 200 and "ok" when shorten a valid URL ', async () => {
    const response = await request(app)
      .post('/shortener')
      .send({ url: 'https://vicentegtz.com/about/' });

    expect(response.status).toBe(status.OK);
    expect(response.body.status).toBe('ok');
  });

  it('Return status 400 and "The url is not valid" error when shorten an empty URL', async () => {
    const response = await request(app).post('/shortener').send({});

    expect(response.status).toBe(status.BAD_REQUEST);
    expect(response.body.status).toBe('err');
    expect(response.body.errors[0].message).toBe('The url is not valid');
  });

  it('Return status 400 and "The url is not valid" error when shorten an invalid URL', async () => {
    const response = await request(app).post('/shortener').send({
      url: 'hello',
    });

    expect(response.status).toBe(status.BAD_REQUEST);
    expect(response.body.status).toBe('err');
    expect(response.body.errors[0].message).toBe('The url is not valid');
  });

  afterEach(async () => {
    await ShortenedUrl.deleteMany({
      source: 'https://vicentegtz.com/about/',
    }).exec();
    await mongoose.disconnect();
  });
});
