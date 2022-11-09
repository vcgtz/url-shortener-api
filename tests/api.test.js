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

describe('Testing API success requests when creating shortened urls', () => {
  beforeEach(async () => {
    await mongoose.connect({ hideLogs: true });
  });

  it('generates a shortened url', async () => {
    const response = await request(app)
      .post('/shortener')
      .send({ url: 'https://vicentegtz.com/about/' });

    expect(response.status).toBe(status.OK);
    expect(response.body.status).toBe('ok');
  });

  afterEach(async () => {
    await ShortenedUrl.deleteMany({
      source: 'https://vicentegtz.com/about/',
    }).exec();
    await mongoose.disconnect();
  });
});

describe('Testing API errors requests when creating shortened urls', () => {
  beforeEach(async () => {
    await mongoose.connect({ hideLogs: true });
  });

  it('returns a status 400 if the url is empty', async () => {
    const response = await request(app).post('/shortener').send({});

    expect(response.status).toBe(status.BAD_REQUEST);
    expect(response.body.status).toBe('err');
    expect(response.body.errors[0].message).toBe('The url is not valid');
  });

  it('returns a status 400 if the url is not valid', async () => {
    const response = await request(app).post('/shortener').send({
      url: 'hello',
    });

    expect(response.status).toBe(status.BAD_REQUEST);
    expect(response.body.status).toBe('err');
    expect(response.body.errors[0].message).toBe('The url is not valid');
  });

  it('return a status 404 if the urlCode already exists', async () => {
    const firstResponse = await request(app)
      .post('/shortener')
      .send({ url: 'https://vicentegtz.com/about/', urlCode: 'shorter' });

    expect(firstResponse.status).toBe(status.OK);

    const secondResponse = await request(app)
      .post('/shortener')
      .send({ url: 'https://vicentegtz.com/about/', urlCode: 'shorter' });

    expect(secondResponse.status).toBe(status.NOT_FOUND);
    expect(secondResponse.body.status).toBe('err');
    expect(secondResponse.body.errors[0].message).toBe(
      'The urlCode is not available',
    );
  });

  it('returns a status 400 if the urlCode is higher than 24 characters', async () => {
    const response = await request(app).post('/shortener').send({
      url: 'https://vicentegtz.com/about/',
      urlCode: 'abcdefghijklmnopqrstuvwxyz',
    });

    expect(response.status).toBe(status.BAD_REQUEST);
    expect(response.body.status).toBe('err');
    expect(response.body.errors[0].message).toBe(
      'The urlCode must have a lengh between 6 and 24 characters',
    );
  });

  it('returns a status 400 if the urlCode is lower than 6 characters', async () => {
    const response = await request(app).post('/shortener').send({
      url: 'https://vicentegtz.com/about/',
      urlCode: 'abc',
    });

    expect(response.status).toBe(status.BAD_REQUEST);
    expect(response.body.status).toBe('err');
    expect(response.body.errors[0].message).toBe(
      'The urlCode must have a lengh between 6 and 24 characters',
    );
  });

  it('returns a status 400 if the urlCode has non-alphanumeric characters', async () => {
    const response = await request(app).post('/shortener').send({
      url: 'https://vicentegtz.com/about/',
      urlCode: 'short#-',
    });

    expect(response.status).toBe(status.BAD_REQUEST);
    expect(response.body.status).toBe('err');
    expect(response.body.errors[0].message).toBe(
      'The urlCode must contain only alphanumeric characters',
    );
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });
});
