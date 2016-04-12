'use strict'; // jshint ignore:line

// var joi = require('joi');
var chai = require('chai');
chai.should();
var expect = chai.expect;
var model = require('../models/enum');
var JoiSequelize = require('../../');
var JS = new JoiSequelize(model);


describe('ENUM', () => {
  describe('Simple use: ENUM(\'type1\', ...)', () => {
    it('Should create joi schema', () => {
      JS.joi.should.have.deep.property('simple');
      JS.joi.simple.isJoi.should.be.ok;
    });
    it('Should validate as string with whitelist valid', ()=>{
      JS.joi.simple._type.should.be.equal('string');
      JS.joi.simple.validate('type1', (err)=> {
        expect(err).to.be.null;
      });
      JS.joi.simple.validate('ty', (err)=> {
        expect(err).to.not.be.null;
      });
    });
    it('Should validate allow null', () => {
      JS.joi.simple.validate(null, (err) => {
        expect(err).to.be.null;
      });
    });
    it('Should validate don\'t allow null', () => {
      JS.joi.simple_not_null.validate(null, (err) => {
        expect(err).to.not.be.null;
      });
    });
    it('Should enable joi description', () => {
      JS.joi.simple._description.should.be.an('string');
    });
  });
});
