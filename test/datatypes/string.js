'use strict'; // jshint ignore:line

// var joi = require('joi');
var chai = require('chai');
chai.should();
var expect = chai.expect;
var model = require('../models/string');
var JoiSequelize = require('../../');
var JS = new JoiSequelize(model);


describe('STRING', () => {
  describe('Simple use: STRING', () => {
    it('Should create joi schema', () => {
      JS.joi.should.have.deep.property('simple');
      JS.joi.simple.isJoi.should.be.ok;
    });
    it('Should validate on string', ()=>{
      JS.joi.simple._type.should.be.equal('string');
      JS.joi.simple.validate('aaaaa', (err)=> {
        expect(err).to.be.null;
      });
    });
    it('Should validate allow null', () => {
      JS.joi.with_length.validate(null, (err) => {
        expect(err).to.be.null;
      });
    });
    it('Should enable joi description', () => {
      JS.joi.simple._description.should.be.an('string');
    });
  });
  describe('String with max length: STRING(length)', () => {
    it('Should create joi schema', () => {
      JS.joi.should.have.deep.property('with_length');
      JS.joi.with_length.isJoi.should.be.ok;
    });
    it('Should validate on a long string', () => {
      JS.joi.with_length._type.should.be.equal('string');
      JS.joi.with_length.validate('aaaa', (err) => {
        err.should.be.an('error');
      });
    });
    it('Should validate allow null', () => {
      JS.joi.with_length.validate(null, (err) => {
        expect(err).to.be.null;
      });
    });
    it('Should enable joi description', () => {
      JS.joi.simple._description.should.be.an('string');
    });
  });

});
