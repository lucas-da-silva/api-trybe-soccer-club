import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { Response } from 'superagent';
import {
  FIELDS_ERROR,
  INVALID_EMAIL,
  EMAIL_PASSWORD_ERROR,
  tokenMock,
  userMock,
  VALID_EMAIL,
  VALID_PASSWORD,
} from './mocks/user.mock';
import JwtFunctions from '../utils/JwtFunctions';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for user route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(UserModel, 'findOne').resolves(userMock as UserModel);
    sinon.stub(JwtFunctions, 'create').resolves(tokenMock);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
    (JwtFunctions.create as sinon.SinonStub).restore();
  });

  it('The /login endpoint allows access with valid data', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    });
    const { body: { token } } = chaiHttpResponse;
    expect(token).to.be.equal(tokenMock);
  });

  it('The /login endpoint does not allow access without informing an email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({});
    const { body: { message } } = chaiHttpResponse;
    expect(message).to.be.equal(FIELDS_ERROR);
  });

  it('The /login endpoint does not allow access with an invalid email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: INVALID_EMAIL,
      password: VALID_PASSWORD,
    });
    const { body: { message } } = chaiHttpResponse;
    expect(message).to.be.equal(EMAIL_PASSWORD_ERROR);
  });
});
