'use strict'; // jshint ignore:line
var chai = require('chai');
var expect = chai.expect;
var model = require('./models/initialization');
var JoiSequelize = require('../');
var JS = new JoiSequelize(model);

describe('Initialization', () => {
  it('should stub sequelize',  () => {
    expect(JS).to.have.deep.property('sequelize.define');
  });
  it('should have a datatypes translate object',  () => {
    expect(JS).to.have.deep.property('datatypes');
  });
  it('should have a joi object',  () => {
    expect(JS).to.have.deep.property('joi');
  });
  it('should have a schema object',  () => {
    expect(JS).to.have.deep.property('schema');
  });
  it('should assign model to respective internal object',  () => {
    expect(JS).to.have.deep.property('model');
    expect(JS.model).to.be.deep.equal(model);
  });
});
