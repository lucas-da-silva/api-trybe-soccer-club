import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import { Response } from 'superagent';
import { teamsMock, teamMock } from './mocks/team.mock';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests for team route', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[]);
    sinon.stub(TeamModel, 'findOne').resolves(teamMock as TeamModel);
  });

  after(() => {
    (TeamModel.findAll as sinon.SinonStub).restore();
    (TeamModel.findOne as sinon.SinonStub).restore();
  });

  it('The /teams endpoint returns all teams correctly', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');
    const { body, status } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.OK);
    expect(body).to.be.deep.equal(teamsMock);
  });

  it('The /teams/:id endpoint return data for a specific team', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/:1');
    const { body, status } = chaiHttpResponse;

    expect(status).to.be.equal(StatusCodes.OK);
    expect(body).to.be.deep.equal(teamMock);
  });
});
