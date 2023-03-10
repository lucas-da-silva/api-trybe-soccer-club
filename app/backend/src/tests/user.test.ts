import * as sinon from 'sinon';
import * as chai from 'chai';
import { StatusCodes } from 'http-status-codes';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { Response } from 'superagent';
import {
  FIELDS_ERROR,
  INVALID_EMAIL,
  EMAIL_PASSWORD_ERROR,
  userMock,
  VALID_EMAIL,
  VALID_PASSWORD,
  INVALID_PASSWORD,
} from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for user route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  });

  it('The /login endpoint allows access with valid data', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    });
    const {
      body: { token },
      status,
    } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.OK);
    expect(typeof token).to.be.equal('string');
  });

  it('The /login endpoint does not allow access without informing an email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({});
    const {
      body: { message },
      status
    } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(message).to.be.equal(FIELDS_ERROR);
  });

  it('The /login endpoint does not allow access without informing an password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: VALID_EMAIL
    });
    const {
      body: { message },
      status
    } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.BAD_REQUEST);
    expect(message).to.be.equal(FIELDS_ERROR);
  });

  it('The /login endpoint does not allow access with an invalid email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: INVALID_EMAIL,
      password: VALID_PASSWORD,
    });
    const {
      body: { message },
      status
    } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(message).to.be.equal(EMAIL_PASSWORD_ERROR);
  });

  it('The /login endpoint does not allow access with an invalid password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: VALID_EMAIL,
      password: INVALID_PASSWORD,
    });
    const {
      body: { message },
      status
    } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(message).to.be.equal(EMAIL_PASSWORD_ERROR);
  });

  it('The /login/validate endpoint returns the data correctly', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    });

    const {
      body: { token },
    } = chaiHttpResponse;

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', token)
      .send({
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      });

    const {
      body: { role },
      status
    } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.OK);
    expect(role).to.be.equal(userMock.role);
  });
});
