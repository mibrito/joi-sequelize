'use strict'; // jshint ignore:line

// var joi = require('joi');
var chai = require('chai');
chai.should();
var expect = chai.expect;
var model = require('../models/boolean');
var JoiSequelize = require('../../');
var JS = new JoiSequelize(model);

describe('BOOLEAN', () => {
  describe('Simple use: BOOLEAN', () => {
    it('Should create joi schema', () => {
      JS.joi().should.have.deep.property('simple');
      JS.joi().simple.isJoi.should.be.ok;
      JS.joi().simple._type.should.be.equal('boolean');
    });
    it('Should validate as boolean', () => {
      JS.joi().simple.validate(true, (err)=> {
        expect(err).to.be.null;
      });
    });
    it('Should sign error with wrong format', ()=> {
      JS.joi().simple.validate('aaaa', (err)=> {
        expect(err).to.not.be.null;
      });
    });
    it('Should validate allow null', () => {
      JS.joi().simple.validate(null, (err) => {
        expect(err).to.be.null;
      });
    });
    it('Should enable joi description', () => {
      JS.joi().simple._description.should.be.an('string');
    });
  });
});
