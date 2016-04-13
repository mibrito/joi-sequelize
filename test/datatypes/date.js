'use strict'; // jshint ignore:line

// var joi = require('joi');
var chai = require('chai');
chai.should();
var expect = chai.expect;
var model = require('../models/date');
var JoiSequelize = require('../../');
var JS = new JoiSequelize(model);


describe('DATE', () => {
  describe('Simple use: DATE', () => {
    it('Should create joi schema', () => {
      JS.joi.should.have.deep.property('simple');
      JS.joi.simple.isJoi.should.be.ok;
      JS.joi.simple._type.should.be.equal('date');
    });
    it('Should validate date as number', ()=>{
      JS.joi.simple.validate(new Date().getTime(), (err)=> {
        expect(err).to.be.null;
      });
    });
    it('Should validate date as string', ()=>{
      JS.joi.simple.validate(new Date(), (err)=> {
        expect(err).to.be.null;
      });
    });
    it('Should validate allow null', () => {
      JS.joi.simple.validate(null, (err) => {
        expect(err).to.be.null;
      });
    });
    it('Should validate with format YYYY/MM/DD', () => {
      JS.joi.with_format.validate('2016/04/12', (err) => {
        expect(err).to.be.null;
      });
    });
    it('Should validate with format iso', () => {
      JS.joi.with_iso.validate(new Date(), (err) => {
        expect(err).to.be.null;
      });
    });
    it('Should sign error with wrong format', ()=>{
      JS.joi.simple.validate('aaaa', (err)=> {
        expect(err).to.not.be.null;
      });
    });
    it('Should enable joi description', () => {
      JS.joi.simple._description.should.be.an('string');
      JS.joi.with_format._description.should.be.an('string');
      JS.joi.with_iso._description.should.be.an('string');
      JS.joi.with_fraction._description.should.be.an('string');
    });
  });
  describe('Date with seconds fraction: DATE(fraction_size)', () => {
    it('Should create joi schema with param', () => {
      JS.joi.should.have.deep.property('with_fraction');
      JS.joi.with_fraction.isJoi.should.be.ok;
      JS.joi.with_fraction._type.should.be.equal('date');
    });
  });
});
