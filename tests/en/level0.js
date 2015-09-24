var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('EN - Level 0', function () {
  beforeEach(function() {
    edtfy.locale('en');
  });
  describe('date: the parser', function() {
    it('should parse \'YYYY\' dates', function() {
      edtfy.parse('1988').should.equal('1988');
    });
    it('should parse \'YYYY\' negative dates', function() {
      edtfy.parse('-1988').should.equal('-1988');
    });
    it('should parse \'in YYYY\' dates', function() {
      edtfy.parse('in 1988').should.equal('1988');
    });
    it('should parse \'MM/YYYY\' dates', function() {
      edtfy.parse('03/1988').should.equal('1988-03');
    });
    it('should parse \'M/YYYY\' dates', function() {
      edtfy.parse('3/1988').should.equal('1988-03');
    });
    it('should parse \'MMM YYYY\' dates', function() {
      edtfy.parse('mar 1988').should.equal('1988-03');
    });
    it('should parse \'MMMM YYYY\' dates', function() {
      edtfy.parse('january 1988').should.equal('1988-01');
      edtfy.parse('february 1988').should.equal('1988-02');
      edtfy.parse('march 1988').should.equal('1988-03');
      edtfy.parse('april 1988').should.equal('1988-04');
      edtfy.parse('may 1988').should.equal('1988-05');
      edtfy.parse('june 1988').should.equal('1988-06');
      edtfy.parse('july 1988').should.equal('1988-07');
      edtfy.parse('august 1988').should.equal('1988-08');
      edtfy.parse('september 1988').should.equal('1988-09');
      edtfy.parse('october 1988').should.equal('1988-10');
      edtfy.parse('november 1988').should.equal('1988-11');
      edtfy.parse('december 1988').should.equal('1988-12');
    });
    it('should parse \'MM/DD/YYYY\' dates', function() {
      edtfy.parse('03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'dddd DD/MM/YYYY\' dates', function() {
      edtfy.parse('monday 03/29/1988').should.equal('1988-03-29');
      edtfy.parse('thursday 03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'ddd DD/MM/YYYY\' dates', function() {
      edtfy.parse('fri 03/29/1988').should.equal('1988-03-29');
      edtfy.parse('wed 03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'the MM/DD/YYYY\' dates', function() {
      edtfy.parse('the 03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'M/D/YYYY\' dates', function() {
      edtfy.parse('3/1/1988').should.equal('1988-03-01');
    });
    it('should parse \'the D/M/YYYY\' dates', function() {
      edtfy.parse('the 3/1/1988').should.equal('1988-03-01');
    });
    it('should parse \'MMM DD YYYY\' dates', function() {
      edtfy.parse('mar 29 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMM the DD YYYY\' dates', function() {
      edtfy.parse('mar the 29 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMMM DD YYYY\' dates', function() {
      edtfy.parse('march 29 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMMM the DD YYYY\' dates', function() {
      edtfy.parse('march the 29th 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMM D YYYY\' dates', function() {
      edtfy.parse('mar 1 1988').should.equal('1988-03-01');
    });
    it('should parse \'MMM the D YYYY\' dates', function() {
      edtfy.parse('mar the 1 1988').should.equal('1988-03-01');
    });
    it('should parse \'MMMM D YYYY\' dates', function() {
      edtfy.parse('march 1 1988').should.equal('1988-03-01');
    });
    it('should parse \'MMMM the D YYYY\' dates', function() {
      edtfy.parse('march the 1st 1988').should.equal('1988-03-01');
    });
    it('should not parse invalid dates', function() {
      (function(){edtfy.parse('01/32/1988')}).should.throw(Error);
      (function(){edtfy.parse('01/0/1988')}).should.throw(Error);
      (function(){edtfy.parse('02/30/1988')}).should.throw(Error);
      (function(){edtfy.parse('04/31/1988')}).should.throw(Error);
      (function(){edtfy.parse('06/31/1988')}).should.throw(Error);
      (function(){edtfy.parse('09/31/1988')}).should.throw(Error);
      (function(){edtfy.parse('11/31/1988')}).should.throw(Error);
      (function(){edtfy.parse('11/31/0')}).should.throw(Error);
    });
  });
  describe('interval: the parser', function() {
    // Between ... and ...
    it('should parse \'between YYYY and YYYY\' intervals', function () {
      edtfy.parse('between 1987 and 1988').should.equal('1987/1988');
      edtfy.parse('bet 1987 and 1988').should.equal('1987/1988');
    });
    it('should parse \'between (the) D(D)/M(M)/YYYY and (the) D(D)/M(M)/YYYY\' intervals', function () {
      edtfy.parse('between 03/28/1988 and 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('between 03/1/1988 and 03/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy.parse('between the 03/28/1988 and the 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('between the 03/1/1988 and the 03/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy.parse('bet the 03/28/1988 and the 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('bet the 03/1/1988 and the 03/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    // De ... to ...
    it('should parse \'from YYYY to YYYY\' intervals', function () {
      edtfy.parse('from 1987 to 1988').should.equal('1987/1988');
      edtfy.parse('1987 to 1988').should.equal('1987/1988');
      edtfy.parse('from 1987 to 1988').should.equal('1987/1988');
      edtfy.parse('1987 to 1988').should.equal('1987/1988');
    });
    it('should parse \'from M(M)/YYYY to M(M)/YYYY\' intervals', function () {
      edtfy.parse('from 02/1988 to 04/1988').should.equal('1988-02/1988-04');
      edtfy.parse('from 02/1988 to 04/1988').should.equal('1988-02/1988-04');
      edtfy.parse('from 2/1988 to 4/1988').should.equal('1988-02/1988-04');
      edtfy.parse('from 2/1988 to 4/1988').should.equal('1988-02/1988-04');
    });
    it('should parse \'from MMM YYYY (to|a) MMM YYYY\' intervals', function () {
      edtfy.parse('from february 1988 to april 1988').should.equal('1988-02/1988-04');
      edtfy.parse('from february 1988 to april 1988').should.equal('1988-02/1988-04');
    });
    it('should parse \'from D(D)/M(M)/YYYY (to|a) D(D)/M(M)/YYYY\' intervals', function () {
      edtfy.parse('from 03/28/1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('from 03/28/1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('from 03/1/1988 to 03/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy.parse('from 03/1/1988 to 03/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy.parse('from 3/1/1988 to 3/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy.parse('from 3/1/1988 to 3/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    // Du ... to ...
    it('should parse \'from D(D)/M(M)/YYYY to D(D)/M(M)/YYYY\' intervals', function () {
      edtfy.parse('from 03/28/1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('from 03/1/1988 to 03/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    it('should parse \'from D(D)/M(M)/YYYY to D(D) MMM YYYY\' intervals', function () {
      edtfy.parse('from 03/28/1988 to march 30 1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('from 03/1/1988 to march 30 1988').should.equal('1988-03-01/1988-03-30');
      edtfy.parse('from 3/1/1988 to march 30 1988').should.equal('1988-03-01/1988-03-30');
      edtfy.parse('from 03/1/1988 to march 2 1988').should.equal('1988-03-01/1988-03-02');
      edtfy.parse('from 3/1/1988 to march 2 1988').should.equal('1988-03-01/1988-03-02');
    });
    it('should parse \'from D(D) MMM YYYY to D(D)/M(M)/YYYY\' intervals', function () {
      edtfy.parse('from march 28 1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('from march 1 1988 to 03/30/1988').should.equal('1988-03-01/1988-03-30');
      edtfy.parse('from march 1 1988 to 3/30/1988').should.equal('1988-03-01/1988-03-30');
      edtfy.parse('from march 1 1988 to 03/2/1988').should.equal('1988-03-01/1988-03-02');
      edtfy.parse('from march 1 1988 to 3/2/1988').should.equal('1988-03-01/1988-03-02');
    });
    // ... - ...
    it('should parse \'D(D)/M(M)/YYYY - D(D)/M(M)/YYYY\' intervals', function () {
      edtfy.parse('03/28/1988 - 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('03/1/1988 - 03/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    it('should parse \'D(D)/M(M)/YYYY - D(D) MMM YYYY\' intervals', function () {
      edtfy.parse('03/28/1988 - march 30 1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('03/1/1988 - march 30 1988').should.equal('1988-03-01/1988-03-30');
      edtfy.parse('3/1/1988 - march 30 1988').should.equal('1988-03-01/1988-03-30');
      edtfy.parse('03/1/1988 - march 2 1988').should.equal('1988-03-01/1988-03-02');
      edtfy.parse('3/1/1988 - march 2 1988').should.equal('1988-03-01/1988-03-02');
    });
    it('should parse \'D(D) MMM YYYY - D(D)/M(M)/YYYY\' intervals', function () {
      edtfy.parse('march 28 1988 - 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy.parse('march 1 1988 - 03/30/1988').should.equal('1988-03-01/1988-03-30');
      edtfy.parse('march 1 1988 - 3/30/1988').should.equal('1988-03-01/1988-03-30');
      edtfy.parse('march 1 1988 - 03/2/1988').should.equal('1988-03-01/1988-03-02');
      edtfy.parse('march 1 1988 - 3/2/1988').should.equal('1988-03-01/1988-03-02');
    });
    // Various
    it('should parse various combinations', function () {
      edtfy.parse('from sep 1988 to 04/30/1988').should.equal('1988-09/1988-04-30');
      edtfy.parse('from OCT 1988 to 04/30/1988').should.equal('1988-10/1988-04-30');
      edtfy.parse('from march 1988 to april 30 1988').should.equal('1988-03/1988-04-30');
      edtfy.parse('from march 1988 to 1989').should.equal('1988-03/1989');
      edtfy.parse('from 1988 to 1/3/1989').should.equal('1988/1989-01-03');
    });
  });
});
