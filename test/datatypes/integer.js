'use strict'; // jshint ignore:line

// var joi = require('joi');
var chai = require('chai');
chai.should();
var expect = chai.expect;
var model = require('../models/integer');
var JoiSequelize = require('../../');
var JS = new JoiSequelize(model);

describe('INTEGER', () => {
  describe('Very Simple use without object', () => {
    it('Should create joi schema', () => {
      JS.joi().should.have.deep.property('very_simple');
      JS.joi().very_simple.isJoi.should.be.ok;
      JS.joi().very_simple._type.should.be.equal('number');
    });
    it('Should throw error with wrong type', () => {
      JS.joi().very_simple.validate('aaaaa', (err)=> {
        expect(err).to.not.be.null;
      });
    });
    it('Should validate as integer', () => {
      JS.joi().very_simple.validate(1, (err)=> {
        expect(err).to.be.null;
      });
    });
    it('Should validate allow null', () => {
      JS.joi().very_simple.validate(null, (err) => {
        expect(err).to.be.null;
      });
    });
    it('Should doesn`t have description', function () {
      expect(JS.joi().very_simple._description).to.be.null;
    });
  });
  describe('Simple use: INTEGER', () => {
    it('Should create joi schema', () => {
      JS.joi().should.have.deep.property('simple');
      JS.joi().simple.isJoi.should.be.ok;
      JS.joi().simple._type.should.be.equal('number');
    });
    it('Should throw error with wrong type', () => {
      JS.joi().simple.validate('aaaaa', (err)=> {
        expect(err).to.not.be.null;
      });
    });
    it('Should validate as integer', () => {
      JS.joi().simple.validate(1, (err)=> {
        expect(err).to.be.null;
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
