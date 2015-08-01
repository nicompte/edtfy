var should = require('chai').should(),
  edtfy = require('../../dist/edtfy'),
  parser = {
    parse: function(string) {
      return edtfy.parse(string, {locale: 'en'});
    }
  };

describe('EN - Level 0', function () {
  describe('date: the parser', function() {
    it('should parse \'YYYY\' dates', function() {
      parser.parse('1988').should.equal('1988');
    });
    it('should parse \'YYYY\' negative dates', function() {
      parser.parse('-1988').should.equal('-1988');
    });
    it('should parse \'in YYYY\' dates', function() {
      parser.parse('in 1988').should.equal('1988');
    });
    it('should parse \'MM/YYYY\' dates', function() {
      parser.parse('03/1988').should.equal('1988-03');
    });
    it('should parse \'M/YYYY\' dates', function() {
      parser.parse('3/1988').should.equal('1988-03');
    });
    it('should parse \'MMM YYYY\' dates', function() {
      parser.parse('mar 1988').should.equal('1988-03');
    });
    it('should parse \'MMMM YYYY\' dates', function() {
      parser.parse('january 1988').should.equal('1988-01');
      parser.parse('february 1988').should.equal('1988-02');
      parser.parse('march 1988').should.equal('1988-03');
      parser.parse('april 1988').should.equal('1988-04');
      parser.parse('may 1988').should.equal('1988-05');
      parser.parse('june 1988').should.equal('1988-06');
      parser.parse('july 1988').should.equal('1988-07');
      parser.parse('august 1988').should.equal('1988-08');
      parser.parse('september 1988').should.equal('1988-09');
      parser.parse('october 1988').should.equal('1988-10');
      parser.parse('november 1988').should.equal('1988-11');
      parser.parse('december 1988').should.equal('1988-12');
    });
    it('should parse \'MM/DD/YYYY\' dates', function() {
      parser.parse('03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'dddd DD/MM/YYYY\' dates', function() {
      parser.parse('monday 03/29/1988').should.equal('1988-03-29');
      parser.parse('thursday 03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'ddd DD/MM/YYYY\' dates', function() {
      parser.parse('fri 03/29/1988').should.equal('1988-03-29');
      parser.parse('wed 03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'the MM/DD/YYYY\' dates', function() {
      parser.parse('the 03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'M/D/YYYY\' dates', function() {
      parser.parse('3/1/1988').should.equal('1988-03-01');
    });
    it('should parse \'the D/M/YYYY\' dates', function() {
      parser.parse('the 3/1/1988').should.equal('1988-03-01');
    });
    it('should parse \'MMM DD YYYY\' dates', function() {
      parser.parse('mar 29 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMM the DD YYYY\' dates', function() {
      parser.parse('mar the 29 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMMM DD YYYY\' dates', function() {
      parser.parse('march 29 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMMM the DD YYYY\' dates', function() {
      parser.parse('march the 29th 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMM D YYYY\' dates', function() {
      parser.parse('mar 1 1988').should.equal('1988-03-01');
    });
    it('should parse \'MMM the D YYYY\' dates', function() {
      parser.parse('mar the 1 1988').should.equal('1988-03-01');
    });
    it('should parse \'MMMM D YYYY\' dates', function() {
      parser.parse('march 1 1988').should.equal('1988-03-01');
    });
    it('should parse \'MMMM the D YYYY\' dates', function() {
      parser.parse('march the 1st 1988').should.equal('1988-03-01');
    });
    it('should not parse invalid dates', function() {
      (function(){parser.parse('01/32/1988')}).should.throw(Error);
      (function(){parser.parse('01/0/1988')}).should.throw(Error);
      (function(){parser.parse('02/30/1988')}).should.throw(Error);
      (function(){parser.parse('04/31/1988')}).should.throw(Error);
      (function(){parser.parse('06/31/1988')}).should.throw(Error);
      (function(){parser.parse('09/31/1988')}).should.throw(Error);
      (function(){parser.parse('11/31/1988')}).should.throw(Error);
    });
  });
  describe('interval: the parser', function() {
    // Between ... and ...
    it('should parse \'between YYYY and YYYY\' intervals', function () {
      parser.parse('between 1987 and 1988').should.equal('1987/1988');
    });
    it('should parse \'between (the) D(D)/M(M)/YYYY and (the) D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('between 03/28/1988 and 03/30/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('between 03/1/1988 and 03/3/1988').should.equal('1988-03-01/1988-03-03');
      parser.parse('between the 03/28/1988 and the 03/30/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('between the 03/1/1988 and the 03/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    // De ... to ...
    it('should parse \'from YYYY to YYYY\' intervals', function () {
      parser.parse('from 1987 to 1988').should.equal('1987/1988');
      parser.parse('1987 to 1988').should.equal('1987/1988');
      parser.parse('from 1987 to 1988').should.equal('1987/1988');
      parser.parse('1987 to 1988').should.equal('1987/1988');
    });
    it('should parse \'from M(M)/YYYY to M(M)/YYYY\' intervals', function () {
      parser.parse('from 02/1988 to 04/1988').should.equal('1988-02/1988-04');
      parser.parse('from 02/1988 to 04/1988').should.equal('1988-02/1988-04');
      parser.parse('from 2/1988 to 4/1988').should.equal('1988-02/1988-04');
      parser.parse('from 2/1988 to 4/1988').should.equal('1988-02/1988-04');
    });
    it('should parse \'from MMM YYYY (to|a) MMM YYYY\' intervals', function () {
      parser.parse('from february 1988 to april 1988').should.equal('1988-02/1988-04');
      parser.parse('from february 1988 to april 1988').should.equal('1988-02/1988-04');
    });
    it('should parse \'from D(D)/M(M)/YYYY (to|a) D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('from 03/28/1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('from 03/28/1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('from 03/1/1988 to 03/3/1988').should.equal('1988-03-01/1988-03-03');
      parser.parse('from 03/1/1988 to 03/3/1988').should.equal('1988-03-01/1988-03-03');
      parser.parse('from 3/1/1988 to 3/3/1988').should.equal('1988-03-01/1988-03-03');
      parser.parse('from 3/1/1988 to 3/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    // Du ... to ...
    it('should parse \'from D(D)/M(M)/YYYY to D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('from 03/28/1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('from 03/1/1988 to 03/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    it('should parse \'from D(D)/M(M)/YYYY to D(D) MMM YYYY\' intervals', function () {
      parser.parse('from 03/28/1988 to march 30 1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('from 03/1/1988 to march 30 1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('from 3/1/1988 to march 30 1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('from 03/1/1988 to march 2 1988').should.equal('1988-03-01/1988-03-02');
      parser.parse('from 3/1/1988 to march 2 1988').should.equal('1988-03-01/1988-03-02');
    });
    it('should parse \'from D(D) MMM YYYY to D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('from march 28 1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('from march 1 1988 to 03/30/1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('from march 1 1988 to 3/30/1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('from march 1 1988 to 03/2/1988').should.equal('1988-03-01/1988-03-02');
      parser.parse('from march 1 1988 to 3/2/1988').should.equal('1988-03-01/1988-03-02');
    });
    // ... - ...
    it('should parse \'D(D)/M(M)/YYYY - D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('03/28/1988 - 03/30/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('03/1/1988 - 03/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    it('should parse \'D(D)/M(M)/YYYY - D(D) MMM YYYY\' intervals', function () {
      parser.parse('03/28/1988 - march 30 1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('03/1/1988 - march 30 1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('3/1/1988 - march 30 1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('03/1/1988 - march 2 1988').should.equal('1988-03-01/1988-03-02');
      parser.parse('3/1/1988 - march 2 1988').should.equal('1988-03-01/1988-03-02');
    });
    it('should parse \'D(D) MMM YYYY - D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('march 28 1988 - 03/30/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('march 1 1988 - 03/30/1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('march 1 1988 - 3/30/1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('march 1 1988 - 03/2/1988').should.equal('1988-03-01/1988-03-02');
      parser.parse('march 1 1988 - 3/2/1988').should.equal('1988-03-01/1988-03-02');
    });
    // Various
    it('should parse various combinations', function () {
      parser.parse('from sep 1988 to 04/30/1988').should.equal('1988-09/1988-04-30');
      parser.parse('from OCT 1988 to 04/30/1988').should.equal('1988-10/1988-04-30');
      parser.parse('from march 1988 to april 30 1988').should.equal('1988-03/1988-04-30');
      parser.parse('from march 1988 to 1989').should.equal('1988-03/1989');
      parser.parse('from 1988 to 1/3/1989').should.equal('1988/1989-01-03');
    });
  });
});
