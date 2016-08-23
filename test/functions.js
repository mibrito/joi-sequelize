'use strict'; // jshint ignore:line
var chai = require('chai');
chai.should();
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
        .validate({ required_field: 1, another_required_field: 1 }, (err) => {
          expect(err).to.be.null;
        });
    });

    it('allowNull true field should should NOT throw an error if its undefined',  () => {
      JS.withRequired()
      .validate({ required_field: 1, another_required_field: 1 }, (err) => {
        expect(err).to.be.null;
      });
    });
  });

  describe('withRequiredOmit', () => {
    it('allowNull false field should throw an error if its undefined',  () => {
      JS.withRequiredOmit('another_required_field')
        .validate({}, (err) => {
          expect(err).to.not.be.null;
        });
    });

    it('allowNull false field should NOT throw an error if its defined',  () => {
      JS.withRequiredOmit('another_required_field')
        .validate({ required_field: 1 }, (err) => {
          expect(err).to.be.null;
        });
    });

    it('allowNull true field should should NOT throw an error if its undefined',  () => {
      JS.withRequiredOmit('another_required_field')
      .validate({ required_field: 1 }, (err) => {
        expect(err).to.be.null;
      });
    });
  });

  describe('withRequiredPick', () => {
    it('allowNull false field should throw an error if its undefined',  () => {
      JS.withRequiredPick('required_field')
        .validate({}, (err) => {
          expect(err).to.not.be.null;
        });
    });

    it('allowNull false field should NOT throw an error if its defined',  () => {
      JS.withRequiredPick('required_field')
        .validate({ required_field: 1 }, (err) => {
          expect(err).to.be.null;
        });
    });

    it('allowNull true field should should NOT throw an error if its undefined',  () => {
      JS.withRequiredPick('required_field')
      .validate({ required_field: 1 }, (err) => {
        expect(err).to.be.null;
      });
    });
  });
});
