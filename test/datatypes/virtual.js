'use strict'; // jshint ignore:line

// var joi = require('joi');
var chai = require('chai');
chai.should();
var expect = chai.expect;
var model = require('../models/virtual.js');
var JoiSequelize = require('../../');
var JS = new JoiSequelize(model);

describe('VIRTUAL', () => {
  describe('Simple use: VIRTUAL', () => {
    it('Should create joi schema', () => {
      JS.joi().should.have.deep.property('virtual');
      JS.joi().virtual.isJoi.should.be.ok;
    });
    it('Should validate as string', ()=> {
      JS.joi().virtual._type.should.be.equal('string');
      JS.joi().virtual.validate('aaaaa', (err)=> {
        expect(err).to.be.null;
      });
      JS.joi().virtual.validate(1, (err)=> {
        expect(err).to.not.be.null;
      });
    });
    it('Should validate allow null', () => {
      JS.joi().virtual.validate(null, (err) => {
        expect(err).to.be.null;
      });
    });
    it('Should enable joi description', () => {
      JS.joi().virtual._description.should.be.an('string');
    });
  });
});
