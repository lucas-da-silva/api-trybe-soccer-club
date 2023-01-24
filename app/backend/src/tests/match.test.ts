import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';
import { Response } from 'superagent';
import {
  matchesInProgress,
  matches,
  matchesFinished,
  newMatch,
  newMatchCreated,
  matchWithSameTeams,
  matchWithTeamInvalid,
  updateMatch,
} from './mocks/match.mock';
import { VALID_EMAIL, VALID_PASSWORD } from './mocks/user.mock';
import { StatusCodes } from 'http-status-codes';
import { teamMock } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for match route', () => {
  let chaiHttpResponse: Response;
  let token: string;

  before(async () => {
    sinon
      .stub(MatchModel, 'findAll')
      .onCall(0)
      .resolves(matches as unknown as MatchModel[])
      .onCall(1)
      .resolves(matchesInProgress as unknown as MatchModel[])
      .onCall(2)
      .resolves(matchesFinished as unknown as MatchModel[]);
    sinon.stub(MatchModel, 'create').resolves(newMatchCreated as MatchModel);

    token = await chai
      .request(app)
      .post('/login')
      .send({
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      })
      .then(({ body }) => body.token);
  });

  after(() => {
    (MatchModel.findAll as sinon.SinonStub).restore();
  });

  it('The /matches endpoint correctly returns match data', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    const { body, status } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.OK);
    expect(body).to.be.deep.equal(matches);
  });

  it('The /matches endpoint returns matches in progress in a filtered way', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({ inProgress: true });
    const { body, status } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.OK);
    expect(body).to.be.deep.equal(matchesInProgress);
  });

  it('The /matches endpoint returns matches finished in a filtered way', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .query({ inProgress: false });
    const { body, status } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.OK);
    expect(body).to.be.deep.equal(matchesFinished);
  });

  it('In the /matches endpoint it should be possible to save a match with inProgress status as true', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(newMatch);
    const { body, status } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.CREATED);
    expect(body).to.be.deep.equal(newMatchCreated);
  });

  it('In the /matches/:id/finish endpoint it is possible to change the inProgress status of a match to false', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');
    const {
      body: { message },
      status,
    } = chaiHttpResponse;

    expect(status).to.be.equal(200);
    expect(message).to.be.deep.equal('Finished');
  });

  it('In the endpoint /matches it is not possible to insert a match with equal teams', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(matchWithSameTeams);
    const {
      body: { message },
      status,
    } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(message).to.be.deep.equal(
      'It is not possible to create a match with two equal teams'
    );
  });

  it('In the /matches endpoint it is not possible to insert a match with a team that does not exist', async () => {    
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token)
      .send(matchWithTeamInvalid);
    const {
      body: { message },
      status,
    } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.NOT_FOUND);
    expect(message).to.be.deep.equal('There is no team with such id!');
  });

  it('In the /matches endpoint unable to insert a match without a valid token', async () => {
    token = '';
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', '')
      .send(newMatch);
    const {
      body: { message },
      status,
    } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.UNAUTHORIZED);
    expect(message).to.be.deep.equal('Token must be a valid token');
  });

  it('In the endpoint /matches/:id it is possible to update matches in progress', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/:id')
      .send(updateMatch);
    const { status } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.UNAUTHORIZED);
  });
});
