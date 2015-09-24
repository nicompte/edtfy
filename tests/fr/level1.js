var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('FR - Level 1', function () {
  beforeEach(function() {
    edtfy.locale('fr');
  });
  describe('uncertain/approximate: the parser', function() {
    it('should parse year uncertain', function() {
      edtfy.parse('1988?').should.equal('1988?');
    });
    it('should parse season uncertain', function() {
      edtfy.parse('hiver 1988?').should.equal('1988-24?');
      edtfy.parse('automne 1988?').should.equal('1988-23?');
    });
    it('should parse month uncertain', function() {
      edtfy.parse('03/1988?').should.equal('1988-03?');
      edtfy.parse('3/1988?').should.equal('1988-03?');
      edtfy.parse('mars 1988?').should.equal('1988-03?');
      edtfy.parse('mar 1988?').should.equal('1988-03?');
    });
    it('should parse day uncertain', function() {
      edtfy.parse('29/03/1988?').should.equal('1988-03-29?');
      edtfy.parse('29/03/1988 ?').should.equal('1988-03-29?');
      edtfy.parse('le 29/03/1988?').should.equal('1988-03-29?');
      edtfy.parse('29/3/1988?').should.equal('1988-03-29?');
      edtfy.parse('29 mars 1988?').should.equal('1988-03-29?');
      edtfy.parse('le 29 mars 1988?').should.equal('1988-03-29?');
      edtfy.parse('29 mar 1988?').should.equal('1988-03-29?');
      edtfy.parse('juin 2003 ?').should.equal('2003-06?');
    });
    it('should parse year approximate', function() {
      edtfy.parse('environ 1988').should.equal('1988~');
      edtfy.parse('vers 1988').should.equal('1988~');
    });
    it('should parse season approximate', function() {
      edtfy.parse('environ l\'hiver 1988').should.equal('1988-24~');
      edtfy.parse('vers l\'automne 1988').should.equal('1988-23~');
    });
    it('should parse month approximate', function() {
      edtfy.parse('environ 03/1988').should.equal('1988-03~');
      edtfy.parse('environ 3/1988').should.equal('1988-03~');
      edtfy.parse('environ mars 1988').should.equal('1988-03~');
      edtfy.parse('environ mar 1988').should.equal('1988-03~');
    });
    it('should parse day approximate', function() {
      edtfy.parse('environ 29/03/1988').should.equal('1988-03-29~');
      edtfy.parse('environ le 29/03/1988').should.equal('1988-03-29~');
      edtfy.parse('environ 29/3/1988').should.equal('1988-03-29~');
      edtfy.parse('environ 29 mars 1988').should.equal('1988-03-29~');
      edtfy.parse('environ le 29 mars 1988').should.equal('1988-03-29~');
      edtfy.parse('environ 29 mar 1988').should.equal('1988-03-29~');
    });
    it('should parse year approximate and uncertain', function() {
      edtfy.parse('environ 1988?').should.equal('1988?~');
      edtfy.parse('vers 1988?').should.equal('1988?~');
    });
    it('should parse season approximate and uncertain', function() {
      edtfy.parse('environ l\'hiver 1988?').should.equal('1988-24?~');
      edtfy.parse('vers l\'automne 1988?').should.equal('1988-23?~');
    });
    it('should parse month approximate and uncertain', function() {
      edtfy.parse('environ 03/1988?').should.equal('1988-03?~');
      edtfy.parse('environ 3/1988?').should.equal('1988-03?~');
      edtfy.parse('environ mars 1988?').should.equal('1988-03?~');
      edtfy.parse('environ mar 1988?').should.equal('1988-03?~');
    });
    it('should parse day approximate and uncertain', function() {
      edtfy.parse('environ 29/03/1988?').should.equal('1988-03-29?~');
      edtfy.parse('environ le 29/03/1988?').should.equal('1988-03-29?~');
      edtfy.parse('environ 29/3/1988?').should.equal('1988-03-29?~');
      edtfy.parse('environ 29 mars 1988?').should.equal('1988-03-29?~');
      edtfy.parse('environ le 29 mars 1988?').should.equal('1988-03-29?~');
      edtfy.parse('environ 29 mar 1988?').should.equal('1988-03-29?~');
    });
  });
  describe('unspecified: the parser', function() {
    it('should parse year unspecified', function() {
      edtfy.parse('198u').should.equal('198u');
      edtfy.parse('19uu').should.equal('19uu');
      edtfy.parse('198*').should.equal('198u');
      edtfy.parse('19**').should.equal('19uu');
    });
    it('should parse month unspecified', function() {
      edtfy.parse('1u/1988').should.equal('1988-1u');
      edtfy.parse('uu/1988').should.equal('1988-uu');
      edtfy.parse('u/1988').should.equal('1988-uu');
      edtfy.parse('1*/1988').should.equal('1988-1u');
      edtfy.parse('**/1988').should.equal('1988-uu');
      edtfy.parse('*/1988').should.equal('1988-uu');
    });
    it('should parse day unspecified', function() {
      edtfy.parse('1u/01/1988').should.equal('1988-01-1u');
      edtfy.parse('1u/1/1988').should.equal('1988-01-1u');
      edtfy.parse('uu/01/1988').should.equal('1988-01-uu');
      edtfy.parse('1*/01/1988').should.equal('1988-01-1u');
      edtfy.parse('1*/1/1988').should.equal('1988-01-1u');
      edtfy.parse('**/01/1988').should.equal('1988-01-uu');
    });
  });
  describe('L1 extended interval: the parser', function() {
    it('should parse intervals with unknown dates', function() {
      edtfy.parse('inconnue - 1988').should.equal('unknown/1988');
      edtfy.parse('1988 - inconnu').should.equal('1988/unknown');
    });
    it('should parse intervals with open dates', function() {
      edtfy.parse('1988 - en cours').should.equal('1988/open');
    });
    it('should parse various intervals', function() {
      edtfy.parse('uu/1988 - environ 2005').should.equal('1988-uu/2005~');
      edtfy.parse('mars 1988 - hiver 2005?').should.equal('1988-03/2005-24?');
      edtfy.parse('de environ 10 sep 1988? à inconnu').should.equal('1988-09-10?~/unknown');
      edtfy.parse('environ 10 sep 1988? - inconnu').should.equal('1988-09-10?~/unknown');
    });
  });
  describe('year exceeding four digits: the parser', function() {
    it('should handle them', function() {
      edtfy.parse('21988').should.equal('y21988');
      edtfy.parse('-21988').should.equal('y-21988');
      edtfy.parse('3 mars -21988').should.equal('y-21988-03-03');
      edtfy.parse('2/-21988').should.equal('y-21988-02');
      edtfy.parse('10/11/21988').should.equal('y21988-11-10');
      edtfy.parse('3 mars -21988').should.equal('y-21988-03-03');
    });
  });
  describe('season: the parser', function() {
    it('should parse seasons', function() {
      edtfy.parse('printemps 1988').should.equal('1988-21');
      edtfy.parse('été 1988').should.equal('1988-22');
      edtfy.parse('ete 1988').should.equal('1988-22');
      edtfy.parse('automne 1988').should.equal('1988-23');
      edtfy.parse('hiver 1988').should.equal('1988-24');
    });
  });
});
