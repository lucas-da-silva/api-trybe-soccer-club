import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { Response } from 'superagent';
import { matchesFilteredMock, matchesMock } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for match route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(MatchModel, 'findAll')
      .onCall(0)
      .resolves(matchesMock as MatchModel[])
      .onCall(1)
      .resolves(matchesFilteredMock as MatchModel[]);
  });

  after(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  });

  it('The /matches endpoint correctly returns match data', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    const { body } = chaiHttpResponse;
    expect(body).to.be.deep.equal(matchesMock);
  });

  it('The /matches endpoint returns matches in progress in a filtered way', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches').query({ inProgress: true });
    const { body } = chaiHttpResponse;
    expect(body).to.be.deep.equal(matchesFilteredMock);
  });
});
