var should = require('chai').should(),
  edtfy = require('../../dist/edtfy'),
  parser = {
    parse: function(string) {
      return edtfy.parse(string, {locale: 'fr'});
    }
  };

describe('FR - Level 1', function () {
  describe('uncertain/approximate: the parser', function() {
    it('should parse year uncertain', function() {
      parser.parse('1988?').should.equal('1988?');
    });
    it('should parse season uncertain', function() {
      parser.parse('hiver 1988?').should.equal('1988-24?');
      parser.parse('automne 1988?').should.equal('1988-23?');
    });
    it('should parse month uncertain', function() {
      parser.parse('03/1988?').should.equal('1988-03?');
      parser.parse('3/1988?').should.equal('1988-03?');
      parser.parse('mars 1988?').should.equal('1988-03?');
      parser.parse('mar 1988?').should.equal('1988-03?');
    });
    it('should parse day uncertain', function() {
      parser.parse('29/03/1988?').should.equal('1988-03-29?');
      parser.parse('29/03/1988 ?').should.equal('1988-03-29?');
      parser.parse('le 29/03/1988?').should.equal('1988-03-29?');
      parser.parse('29/3/1988?').should.equal('1988-03-29?');
      parser.parse('29 mars 1988?').should.equal('1988-03-29?');
      parser.parse('le 29 mars 1988?').should.equal('1988-03-29?');
      parser.parse('29 mar 1988?').should.equal('1988-03-29?');
      parser.parse('juin 2003 ?').should.equal('2003-06?');
    });
    it('should parse year approximate', function() {
      parser.parse('environ 1988').should.equal('1988~');
      parser.parse('vers 1988').should.equal('1988~');
    });
    it('should parse season approximate', function() {
      parser.parse('environ l\'hiver 1988').should.equal('1988-24~');
      parser.parse('vers l\'automne 1988').should.equal('1988-23~');
    });
    it('should parse month approximate', function() {
      parser.parse('environ 03/1988').should.equal('1988-03~');
      parser.parse('environ 3/1988').should.equal('1988-03~');
      parser.parse('environ mars 1988').should.equal('1988-03~');
      parser.parse('environ mar 1988').should.equal('1988-03~');
    });
    it('should parse day approximate', function() {
      parser.parse('environ 29/03/1988').should.equal('1988-03-29~');
      parser.parse('environ le 29/03/1988').should.equal('1988-03-29~');
      parser.parse('environ 29/3/1988').should.equal('1988-03-29~');
      parser.parse('environ 29 mars 1988').should.equal('1988-03-29~');
      parser.parse('environ le 29 mars 1988').should.equal('1988-03-29~');
      parser.parse('environ 29 mar 1988').should.equal('1988-03-29~');
    });
    it('should parse year approximate and uncertain', function() {
      parser.parse('environ 1988?').should.equal('1988?~');
      parser.parse('vers 1988?').should.equal('1988?~');
    });
    it('should parse season approximate and uncertain', function() {
      parser.parse('environ l\'hiver 1988?').should.equal('1988-24?~');
      parser.parse('vers l\'automne 1988?').should.equal('1988-23?~');
    });
    it('should parse month approximate and uncertain', function() {
      parser.parse('environ 03/1988?').should.equal('1988-03?~');
      parser.parse('environ 3/1988?').should.equal('1988-03?~');
      parser.parse('environ mars 1988?').should.equal('1988-03?~');
      parser.parse('environ mar 1988?').should.equal('1988-03?~');
    });
    it('should parse day approximate and uncertain', function() {
      parser.parse('environ 29/03/1988?').should.equal('1988-03-29?~');
      parser.parse('environ le 29/03/1988?').should.equal('1988-03-29?~');
      parser.parse('environ 29/3/1988?').should.equal('1988-03-29?~');
      parser.parse('environ 29 mars 1988?').should.equal('1988-03-29?~');
      parser.parse('environ le 29 mars 1988?').should.equal('1988-03-29?~');
      parser.parse('environ 29 mar 1988?').should.equal('1988-03-29?~');
    });
  });
  describe('unspecified: the parser', function() {
    it('should parse year unspecified', function() {
      parser.parse('198u').should.equal('198u');
      parser.parse('19uu').should.equal('19uu');
    });
    it('should parse month unspecified', function() {
      parser.parse('1u/1988').should.equal('1988-1u');
      parser.parse('uu/1988').should.equal('1988-uu');
      parser.parse('u/1988').should.equal('1988-uu');
    });
    it('should parse day unspecified', function() {
      parser.parse('1u/01/1988').should.equal('1988-01-1u');
      parser.parse('1u/1/1988').should.equal('1988-01-1u');
      parser.parse('uu/01/1988').should.equal('1988-01-uu');
    });
  });
  describe('L1 extended interval: the parser', function() {
    it('should parse intervals with unknown dates', function() {
      parser.parse('inconnue - 1988').should.equal('unknown/1988');
      parser.parse('1988 - inconnu').should.equal('1988/unknown');
    });
    it('should parse intervals with open dates', function() {
      parser.parse('1988 - en cours').should.equal('1988/open');
    });
    it('should parse various intervals', function() {
      parser.parse('uu/1988 - environ 2005').should.equal('1988-uu/2005~');
      parser.parse('mars 1988 - hiver 2005?').should.equal('1988-03/2005-24?');
      parser.parse('de environ 10 sep 1988? à inconnu').should.equal('1988-09-10?~/unknown');
      parser.parse('environ 10 sep 1988? - inconnu').should.equal('1988-09-10?~/unknown');
    });
  });
  describe('year exceeding four digits: the parser', function() {
    it('should handle them', function() {
      parser.parse('21988').should.equal('y21988');
      parser.parse('-21988').should.equal('y-21988');
      parser.parse('3 mars -21988').should.equal('y-21988-03-03');
      parser.parse('2/-21988').should.equal('y-21988-02');
      parser.parse('10/11/21988').should.equal('y21988-11-10');
      parser.parse('3 mars -21988').should.equal('y-21988-03-03');
    });
  });
  describe('season: the parser', function() {
    it('should parse seasons', function() {
      parser.parse('printemps 1988').should.equal('1988-21');
      parser.parse('été 1988').should.equal('1988-22');
      parser.parse('ete 1988').should.equal('1988-22');
      parser.parse('automne 1988').should.equal('1988-23');
      parser.parse('hiver 1988').should.equal('1988-24');
    });
  });
});
