import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import { Response } from 'superagent';
import { teamsWithMatches, leaderboard, teamsWithMatchesHome, leaderboardHome, teamsWithMatchesAway, leaderboardAway } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for leaderboard route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(TeamModel, 'findAll')
      .onCall(0)
      .resolves(teamsWithMatches as unknown as TeamModel[])
      .onCall(1)
      .resolves(teamsWithMatchesHome as unknown as TeamModel[])
      .onCall(2)
      .resolves(teamsWithMatchesAway as unknown as TeamModel[]);
  });

  after(() => {
    (TeamModel.findAll as sinon.SinonStub).restore();
  });

  it('The /leaderboard endpoint returns the ranking of the teams', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard');
    const { body } = chaiHttpResponse;
    expect(body).to.be.deep.equal(leaderboard);
  });

  it('The /leaderboard/home endpoint returns the ranking of teams with home games', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    const { body } = chaiHttpResponse;
    expect(body).to.be.deep.equal(leaderboardHome);
  });

  it('The /leaderboard/away endpoint returns the ranking of teams with away games', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
    const { body } = chaiHttpResponse;
    expect(body).to.be.deep.equal(leaderboardAway);
  });
});
