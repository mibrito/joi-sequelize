'use strict'; // jshint ignore:line
var chai = require('chai');
var expect = chai.expect;
var model = require('./models/functions');
var JoiSequelize = require('../');
var JS = new JoiSequelize(model);

describe('Functions', () => {
  describe('withRequired', () => {
    it('allowNull false field should throw an error if its undefined',  () => {
      JS.withRequired()
        .validate({}, (err) => {
          expect(err).to.not.be.null;
        });
    });

    it('allowNull false field should NOT throw an error if its defined',  () => {
      JS.withRequired()
        .validate({ required_field: 1 }, (err) => {
          expect(err).to.be.null;
        });
    });

    it('allowNull true field should should NOT throw an error if its undefined',  () => {
      JS.withRequired().validate({ required_field: 1 }, (err) => {
        expect(err).to.be.null;
      });
    });
  });
});
