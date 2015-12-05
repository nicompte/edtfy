var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('EN - Level 0', function () {
  beforeEach(function() {
    edtfy.locale('en');
  });
  describe('date: the parser', function() {
    it('should parse \'YYYY\' dates', function() {
      edtfy('1988').should.equal('1988');
    });
    it('should parse \'YYYY\' negative dates', function() {
      edtfy('-1988').should.equal('-1988');
    });
    it('should parse \'in YYYY\' dates', function() {
      edtfy('in 1988').should.equal('1988');
    });
    it('should parse \'MM/YYYY\' dates', function() {
      edtfy('03/1988').should.equal('1988-03');
    });
    it('should parse \'M/YYYY\' dates', function() {
      edtfy('3/1988').should.equal('1988-03');
    });
    it('should parse \'MMM YYYY\' dates', function() {
      edtfy('mar 1988').should.equal('1988-03');
    });
    it('should parse \'MMMM YYYY\' dates', function() {
      edtfy('january 1988').should.equal('1988-01');
      edtfy('february 1988').should.equal('1988-02');
      edtfy('march 1988').should.equal('1988-03');
      edtfy('april 1988').should.equal('1988-04');
      edtfy('may 1988').should.equal('1988-05');
      edtfy('june 1988').should.equal('1988-06');
      edtfy('july 1988').should.equal('1988-07');
      edtfy('august 1988').should.equal('1988-08');
      edtfy('september 1988').should.equal('1988-09');
      edtfy('october 1988').should.equal('1988-10');
      edtfy('november 1988').should.equal('1988-11');
      edtfy('december 1988').should.equal('1988-12');
    });
    it('should parse \'MM/DD/YYYY\' dates', function() {
      edtfy('03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'dddd DD/MM/YYYY\' dates', function() {
      edtfy('monday 03/29/1988').should.equal('1988-03-29');
      edtfy('thursday 03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'ddd DD/MM/YYYY\' dates', function() {
      edtfy('fri 03/29/1988').should.equal('1988-03-29');
      edtfy('wed 03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'the MM/DD/YYYY\' dates', function() {
      edtfy('the 03/29/1988').should.equal('1988-03-29');
    });
    it('should parse \'M/D/YYYY\' dates', function() {
      edtfy('3/1/1988').should.equal('1988-03-01');
    });
    it('should parse \'the D/M/YYYY\' dates', function() {
      edtfy('the 3/1/1988').should.equal('1988-03-01');
    });
    it('should parse \'MMM DD YYYY\' dates', function() {
      edtfy('mar 29 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMM the DD YYYY\' dates', function() {
      edtfy('mar the 29 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMMM DD YYYY\' dates', function() {
      edtfy('march 29 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMMM the DD YYYY\' dates', function() {
      edtfy('march the 29th 1988').should.equal('1988-03-29');
    });
    it('should parse \'MMM D YYYY\' dates', function() {
      edtfy('mar 1 1988').should.equal('1988-03-01');
    });
    it('should parse \'MMM the D YYYY\' dates', function() {
      edtfy('mar the 1 1988').should.equal('1988-03-01');
    });
    it('should parse \'MMMM D YYYY\' dates', function() {
      edtfy('march 1 1988').should.equal('1988-03-01');
    });
    it('should parse \'MMMM the D YYYY\' dates', function() {
      edtfy('march the 1st 1988').should.equal('1988-03-01');
    });
    it('should not parse invalid dates', function() {
      (function(){edtfy('01/32/1988')}).should.throw(Error);
      (function(){edtfy('01/0/1988')}).should.throw(Error);
      (function(){edtfy('02/30/1988')}).should.throw(Error);
      (function(){edtfy('04/31/1988')}).should.throw(Error);
      (function(){edtfy('06/31/1988')}).should.throw(Error);
      (function(){edtfy('09/31/1988')}).should.throw(Error);
      (function(){edtfy('11/31/1988')}).should.throw(Error);
      (function(){edtfy('11/31/0')}).should.throw(Error);
    });
  });
  describe('interval: the parser', function() {
    // Between ... and ...
    it('should parse \'between YYYY and YYYY\' intervals', function () {
      edtfy('between 1987 and 1988').should.equal('1987/1988');
      edtfy('bet 1987 and 1988').should.equal('1987/1988');
    });
    it('should parse \'between (the) D(D)/M(M)/YYYY and (the) D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('between 03/28/1988 and 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('between 03/1/1988 and 03/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy('between the 03/28/1988 and the 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('between the 03/1/1988 and the 03/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy('bet the 03/28/1988 and the 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('bet the 03/1/1988 and the 03/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    // De ... to ...
    it('should parse \'from YYYY to YYYY\' intervals', function () {
      edtfy('from 1987 to 1988').should.equal('1987/1988');
      edtfy('1987 to 1988').should.equal('1987/1988');
      edtfy('from 1987 to 1988').should.equal('1987/1988');
      edtfy('1987 to 1988').should.equal('1987/1988');
    });
    it('should parse \'from M(M)/YYYY to M(M)/YYYY\' intervals', function () {
      edtfy('from 02/1988 to 04/1988').should.equal('1988-02/1988-04');
      edtfy('from 02/1988 to 04/1988').should.equal('1988-02/1988-04');
      edtfy('from 2/1988 to 4/1988').should.equal('1988-02/1988-04');
      edtfy('from 2/1988 to 4/1988').should.equal('1988-02/1988-04');
    });
    it('should parse \'from MMM YYYY (to|a) MMM YYYY\' intervals', function () {
      edtfy('from february 1988 to april 1988').should.equal('1988-02/1988-04');
      edtfy('from february 1988 to april 1988').should.equal('1988-02/1988-04');
    });
    it('should parse \'from D(D)/M(M)/YYYY (to|a) D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('from 03/28/1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('from 03/28/1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('from 03/1/1988 to 03/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy('from 03/1/1988 to 03/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy('from 3/1/1988 to 3/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy('from 3/1/1988 to 3/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    // Du ... to ...
    it('should parse \'from D(D)/M(M)/YYYY to D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('from 03/28/1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('from 03/1/1988 to 03/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    it('should parse \'from D(D)/M(M)/YYYY to D(D) MMM YYYY\' intervals', function () {
      edtfy('from 03/28/1988 to march 30 1988').should.equal('1988-03-28/1988-03-30');
      edtfy('from 03/1/1988 to march 30 1988').should.equal('1988-03-01/1988-03-30');
      edtfy('from 3/1/1988 to march 30 1988').should.equal('1988-03-01/1988-03-30');
      edtfy('from 03/1/1988 to march 2 1988').should.equal('1988-03-01/1988-03-02');
      edtfy('from 3/1/1988 to march 2 1988').should.equal('1988-03-01/1988-03-02');
    });
    it('should parse \'from D(D) MMM YYYY to D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('from march 28 1988 to 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('from march 1 1988 to 03/30/1988').should.equal('1988-03-01/1988-03-30');
      edtfy('from march 1 1988 to 3/30/1988').should.equal('1988-03-01/1988-03-30');
      edtfy('from march 1 1988 to 03/2/1988').should.equal('1988-03-01/1988-03-02');
      edtfy('from march 1 1988 to 3/2/1988').should.equal('1988-03-01/1988-03-02');
    });
    // ... - ...
    it('should parse \'D(D)/M(M)/YYYY - D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('03/28/1988 - 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('03/1/1988 - 03/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    it('should parse \'D(D)/M(M)/YYYY - D(D) MMM YYYY\' intervals', function () {
      edtfy('03/28/1988 - march 30 1988').should.equal('1988-03-28/1988-03-30');
      edtfy('03/1/1988 - march 30 1988').should.equal('1988-03-01/1988-03-30');
      edtfy('3/1/1988 - march 30 1988').should.equal('1988-03-01/1988-03-30');
      edtfy('03/1/1988 - march 2 1988').should.equal('1988-03-01/1988-03-02');
      edtfy('3/1/1988 - march 2 1988').should.equal('1988-03-01/1988-03-02');
    });
    it('should parse \'D(D) MMM YYYY - D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('march 28 1988 - 03/30/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('march 1 1988 - 03/30/1988').should.equal('1988-03-01/1988-03-30');
      edtfy('march 1 1988 - 3/30/1988').should.equal('1988-03-01/1988-03-30');
      edtfy('march 1 1988 - 03/2/1988').should.equal('1988-03-01/1988-03-02');
      edtfy('march 1 1988 - 3/2/1988').should.equal('1988-03-01/1988-03-02');
    });
    // Various
    it('should parse various combinations', function () {
      edtfy('from sep 1988 to 04/30/1988').should.equal('1988-09/1988-04-30');
      edtfy('from OCT 1988 to 04/30/1988').should.equal('1988-10/1988-04-30');
      edtfy('from march 1988 to april 30 1988').should.equal('1988-03/1988-04-30');
      edtfy('from march 1988 to 1989').should.equal('1988-03/1989');
      edtfy('from 1988 to 1/3/1989').should.equal('1988/1989-01-03');
    });
  });
});
