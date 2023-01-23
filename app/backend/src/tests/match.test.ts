import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { Response } from 'superagent';
import { matchesInProgress, matches, matchesFinished } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for match route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(MatchModel, 'findAll')
      .onCall(0)
      .resolves(matches as MatchModel[])
      .onCall(1)
      .resolves(matchesInProgress as MatchModel[])
      .onCall(3)
      .resolves(matchesFinished as MatchModel[]);
  });

  after(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  });

  it('The /matches endpoint correctly returns match data', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    const { body } = chaiHttpResponse;
    expect(body).to.be.deep.equal(matches);
  });

  it('The /matches endpoint returns matches in progress in a filtered way', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches').query({ inProgress: false });
    const { body } = chaiHttpResponse;
    expect(body).to.be.deep.equal(matchesFinished);
  });
});
