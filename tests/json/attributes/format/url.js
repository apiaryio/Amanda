if (typeof module !== 'undefined' && module.exports) {
  var expect = require('expect.js');
  var amanda = require('../../../../releases/latest/amanda.js');
  var domains = require('../../../resources/domains.js');
  var domainNames = require('../../../resources/domainNames.js');
  var params = require('../../../resources/params.js');
}

/**
 * Format
 * --------------------
 */
suite('JSON/Attribute/format#url', function() {

  var count = 0;

  /**
   * Schema
   */
  var schema = {
    format: 'url'
  };

  /**
   * Validator
   */
  var Validator = amanda('json');

  test('should not return an error', function() {
    // test have length 6393ms
    this.timeout(15000);
    domains.forEach(function(domain) {
      domainNames.forEach(function(name) {

        Validator.validate(name + domain, schema, function(error) {
          count += 1;
          expect(error).to.not.be.ok();
        });

        params.forEach(function(param) {
          Validator.validate(name + domain + param, schema, function(error) {
            count += 1;
            expect(error).to.not.be.ok();
          });
        });

      });
    });
  });

  test('should return an error', function() {
    [
      '',
      '  ',
      '\n',
      '\r',
      '\n\r',
      '\n\n\n\n\n\n',
    ].forEach(function(input) {
      Validator.validate(input, schema, function(error) {
        count += 1;
        expect(error).to.be.ok();
      });
    });
  });

  test('should run specified number of times', function() {
    expect(count).to.be.eql(18906);
  });

});
