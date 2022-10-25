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
const app = require('../src/server');

describe('Testing the API to create shortened urls', () => {
  beforeEach(async () => {
    await mongoose.connect({ hideLogs: true });
  });

  it('generates a shortened url', async () => {
    const response = await request(app)
      .post('/shortener')
      .send({ url: 'https://vicentegtz.com/about/' });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  afterEach(async () => {
    await ShortenedUrl.deleteMany({
      source: 'https://vicentegtz.com/about/',
    }).exec();
    await mongoose.disconnect();
  });
});
