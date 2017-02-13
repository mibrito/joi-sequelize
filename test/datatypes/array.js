'use strict'; // jshint ignore:line

// var joi = require('joi');
var chai = require('chai');
chai.should();
var expect = chai.expect;
var model = require('../models/array');
var JoiSequelize = require('../../');
var JS = new JoiSequelize(model);

var mixedArr = [true, 123, '123'];

describe('ARRAY', () => {
  describe('Simple use: ARRAY', () => {
    it('Should create joi schema', () => {
      JS.joi().should.have.deep.property('text');
      JS.joi().should.have.deep.property('boolean');
      JS.joi().should.have.deep.property('integer');
      JS.joi().text.isJoi.should.be.ok;
      JS.joi().boolean.isJoi.should.be.ok;
      JS.joi().integer.isJoi.should.be.ok;
      JS.joi().text._type.should.be.equal('array');
      JS.joi().boolean._type.should.be.equal('array');
      JS.joi().integer._type.should.be.equal('array');
    });
    it('Should validate text array', () => {
      var arr = ['a', 'abc', 'def'];
      JS.joi().text.validate(arr, (err)=> {
        expect(err).to.be.null;
      });
    });
    it('Should validate boolean array', () => {
      var arr = [true, false];
      JS.joi().boolean.validate(arr, (err)=> {
        expect(err).to.be.null;
      });
    });
    it('Should validate integer array', () => {
      var arr = [1, 2, 3, 4];
      JS.joi().integer.validate(arr, (err)=> {
        expect(err).to.be.null;
      });
    });
    it('Should not validate mixed array as text array', () => {
      JS.joi().text.validate(mixedArr, (err)=> {
        expect(err).not.to.be.null;
      });
    });
    it('Should not validate mixed array as boolean array', () => {
      JS.joi().text.validate(mixedArr, (err)=> {
        expect(err).not.to.be.null;
      });
    });
    it('Should not validate mixed array as integer array', () => {
      JS.joi().text.validate(mixedArr, (err)=> {
        expect(err).not.to.be.null;
      });
    });
  });
});
