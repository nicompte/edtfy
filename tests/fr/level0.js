var should = require('chai').should(),
  edtfy = require('../../dist/edtfy'),
  parser = {
    parse: function(string) {
      return edtfy.parse(string, {locale: 'fr'});
    }
  };

describe('FR - Level 0', function () {
  describe('date: the parser', function() {
    it('should parse \'YYYY\' dates', function() {
      parser.parse('1988').should.equal('1988');
    });
    it('should parse \'YYYY\' negative dates', function() {
      parser.parse('-1988').should.equal('-1988');
    });
    it('should parse \'en YYYY\' dates', function() {
      parser.parse('en 1988').should.equal('1988');
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
      parser.parse('janvier 1988').should.equal('1988-01');
      parser.parse('février 1988').should.equal('1988-02');
      parser.parse('fevrier 1988').should.equal('1988-02');
      parser.parse('mars 1988').should.equal('1988-03');
      parser.parse('avril 1988').should.equal('1988-04');
      parser.parse('mai 1988').should.equal('1988-05');
      parser.parse('juin 1988').should.equal('1988-06');
      parser.parse('juillet 1988').should.equal('1988-07');
      parser.parse('août 1988').should.equal('1988-08');
      parser.parse('aout 1988').should.equal('1988-08');
      parser.parse('septembre 1988').should.equal('1988-09');
      parser.parse('octobre 1988').should.equal('1988-10');
      parser.parse('novembre 1988').should.equal('1988-11');
      parser.parse('décembre 1988').should.equal('1988-12');
      parser.parse('decembre 1988').should.equal('1988-12');
    });
    it('should parse \'DD/MM/YYYY\' dates', function() {
      parser.parse('29/03/1988').should.equal('1988-03-29');
    });
    it('should parse \'dddd DD/MM/YYYY\' dates', function() {
      parser.parse('lundi 29/03/1988').should.equal('1988-03-29');
      parser.parse('jeudi 29/03/1988').should.equal('1988-03-29');
    });
    it('should parse \'ddd DD/MM/YYYY\' dates', function() {
      parser.parse('ven 29/03/1988').should.equal('1988-03-29');
      parser.parse('mer 29/03/1988').should.equal('1988-03-29');
    });
    it('should parse \'le DD/MM/YYYY\' dates', function() {
      parser.parse('le 29/03/1988').should.equal('1988-03-29');
    });
    it('should parse \'D/M/YYYY\' dates', function() {
      parser.parse('1/3/1988').should.equal('1988-03-01');
    });
    it('should parse \'le D/M/YYYY\' dates', function() {
      parser.parse('le 1/3/1988').should.equal('1988-03-01');
    });
    it('should parse \'DD MMM YYYY\' dates', function() {
      parser.parse('29 mar 1988').should.equal('1988-03-29');
    });
    it('should parse \'le DD MMM YYYY\' dates', function() {
      parser.parse('le 29 mar 1988').should.equal('1988-03-29');
    });
    it('should parse \'DD MMMM YYYY\' dates', function() {
      parser.parse('29 mars 1988').should.equal('1988-03-29');
    });
    it('should parse \'le DD MMMM YYYY\' dates', function() {
      parser.parse('le 29 mars 1988').should.equal('1988-03-29');
    });
    it('should parse \'D MMM YYYY\' dates', function() {
      parser.parse('1 mar 1988').should.equal('1988-03-01');
    });
    it('should parse \'le D MMM YYYY\' dates', function() {
      parser.parse('le 1 mar 1988').should.equal('1988-03-01');
    });
    it('should parse \'D MMMM YYYY\' dates', function() {
      parser.parse('1 mars 1988').should.equal('1988-03-01');
    });
    it('should parse \'le D MMMM YYYY\' dates', function() {
      parser.parse('le 1 mars 1988').should.equal('1988-03-01');
    });
    it('should not parse invalid dates', function() {
      (function(){parser.parse('32/01/1988')}).should.throw(Error);
      (function(){parser.parse('0/01/1988')}).should.throw(Error);
      (function(){parser.parse('01/13/1988')}).should.throw(Error);
      (function(){parser.parse('30/02/1988')}).should.throw(Error);
      (function(){parser.parse('31/04/1988')}).should.throw(Error);
      (function(){parser.parse('31/06/1988')}).should.throw(Error);
      (function(){parser.parse('31/09/1988')}).should.throw(Error);
      (function(){parser.parse('31/11/1988')}).should.throw(Error);
    });
  });
  describe('interval: the parser', function() {
    // Entre ... et ...
    it('should parse \'entre YYYY et YYYY\' intervals', function () {
      parser.parse('entre 1987 et 1988').should.equal('1987/1988');
    });
    it('should parse \'entre (le) D(D)/M(M)/YYYY et (le) D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('entre 28/03/1988 et 30/03/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('entre 1/03/1988 et 3/03/1988').should.equal('1988-03-01/1988-03-03');
      parser.parse('entre le 28/03/1988 et le 30/03/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('entre le 1/03/1988 et le 3/03/1988').should.equal('1988-03-01/1988-03-03');
    });
    // De ... à ...
    it('should parse \'de YYYY (à|a) YYYY\' intervals', function () {
      parser.parse('de 1987 à 1988').should.equal('1987/1988');
      parser.parse('1987 à 1988').should.equal('1987/1988');
      parser.parse('de 1987 a 1988').should.equal('1987/1988');
      parser.parse('1987 a 1988').should.equal('1987/1988');
    });
    it('should parse \'de M(M)/YYYY (à|a) M(M)/YYYY\' intervals', function () {
      parser.parse('de 02/1988 à 04/1988').should.equal('1988-02/1988-04');
      parser.parse('de 02/1988 a 04/1988').should.equal('1988-02/1988-04');
      parser.parse('de 2/1988 à 4/1988').should.equal('1988-02/1988-04');
      parser.parse('de 2/1988 a 4/1988').should.equal('1988-02/1988-04');
    });
    it('should parse \'de MMM YYYY (à|a) MMM YYYY\' intervals', function () {
      parser.parse('de février 1988 à avril 1988').should.equal('1988-02/1988-04');
      parser.parse('de février 1988 a avril 1988').should.equal('1988-02/1988-04');
    });
    it('should parse \'de D(D)/M(M)/YYYY (à|a) D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('de 28/03/1988 à 30/03/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('de 28/03/1988 a 30/03/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('de 1/03/1988 à 3/03/1988').should.equal('1988-03-01/1988-03-03');
      parser.parse('de 1/03/1988 a 3/03/1988').should.equal('1988-03-01/1988-03-03');
      parser.parse('de 1/3/1988 à 3/3/1988').should.equal('1988-03-01/1988-03-03');
      parser.parse('de 1/3/1988 a 3/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    // Du ... au ...
    it('should parse \'du D(D)/M(M)/YYYY au D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('du 28/03/1988 au 30/03/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('du 1/03/1988 au 3/03/1988').should.equal('1988-03-01/1988-03-03');
    });
    it('should parse \'du D(D)/M(M)/YYYY au D(D) MMM YYYY\' intervals', function () {
      parser.parse('du 28/03/1988 au 30 mars 1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('du 1/03/1988 au 30 mars 1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('du 1/3/1988 au 30 mars 1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('du 1/03/1988 au 2 mars 1988').should.equal('1988-03-01/1988-03-02');
      parser.parse('du 1/3/1988 au 2 mars 1988').should.equal('1988-03-01/1988-03-02');
    });
    it('should parse \'du D(D) MMM YYYY au D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('du 28 mars 1988 au 30/03/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('du 1 mars 1988 au 30/03/1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('du 1 mars 1988 au 30/3/1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('du 1 mars 1988 au 2/03/1988').should.equal('1988-03-01/1988-03-02');
      parser.parse('du 1 mars 1988 au 2/3/1988').should.equal('1988-03-01/1988-03-02');
    });
    // ... - ...
    it('should parse \'D(D)/M(M)/YYYY - D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('28/03/1988 - 30/03/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('1/03/1988 - 3/03/1988').should.equal('1988-03-01/1988-03-03');
    });
    it('should parse \'D(D)/M(M)/YYYY - D(D) MMM YYYY\' intervals', function () {
      parser.parse('28/03/1988 - 30 mars 1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('1/03/1988 - 30 mars 1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('1/3/1988 - 30 mars 1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('1/03/1988 - 2 mars 1988').should.equal('1988-03-01/1988-03-02');
      parser.parse('1/3/1988 - 2 mars 1988').should.equal('1988-03-01/1988-03-02');
    });
    it('should parse \'D(D) MMM YYYY - D(D)/M(M)/YYYY\' intervals', function () {
      parser.parse('28 mars 1988 - 30/03/1988').should.equal('1988-03-28/1988-03-30');
      parser.parse('1 mars 1988 - 30/03/1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('1 mars 1988 - 30/3/1988').should.equal('1988-03-01/1988-03-30');
      parser.parse('1 mars 1988 - 2/03/1988').should.equal('1988-03-01/1988-03-02');
      parser.parse('1 mars 1988 - 2/3/1988').should.equal('1988-03-01/1988-03-02');
    });
    // Various
    it('should parse various combinations', function () {
      parser.parse('de sep 1988 au 30/04/1988').should.equal('1988-09/1988-04-30');
      parser.parse('de OCT 1988 au 30/04/1988').should.equal('1988-10/1988-04-30');
      parser.parse('de mars 1988 au 30 avril 1988').should.equal('1988-03/1988-04-30');
      parser.parse('de mars 1988 à 1989').should.equal('1988-03/1989');
      parser.parse('de 1988 au 3/1/1989').should.equal('1988/1989-01-03');
    });
  });
});
