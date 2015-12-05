var should = require('chai').should(),
  edtfy = require('../../dist/edtfy');

describe('FR - Level 0', function () {
  beforeEach(function() {
    edtfy.locale('fr');
  });
  describe('date: the parser', function() {
    it('should parse \'YYYY\' dates', function() {
      edtfy('1988').should.equal('1988');
    });
    it('should parse \'YYYY\' negative dates', function() {
      edtfy('-1988').should.equal('-1988');
    });
    it('should parse \'en YYYY\' dates', function() {
      edtfy('en 1988').should.equal('1988');
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
      edtfy('janvier 1988').should.equal('1988-01');
      edtfy('février 1988').should.equal('1988-02');
      edtfy('fevrier 1988').should.equal('1988-02');
      edtfy('mars 1988').should.equal('1988-03');
      edtfy('avril 1988').should.equal('1988-04');
      edtfy('mai 1988').should.equal('1988-05');
      edtfy('juin 1988').should.equal('1988-06');
      edtfy('juillet 1988').should.equal('1988-07');
      edtfy('août 1988').should.equal('1988-08');
      edtfy('aout 1988').should.equal('1988-08');
      edtfy('septembre 1988').should.equal('1988-09');
      edtfy('octobre 1988').should.equal('1988-10');
      edtfy('novembre 1988').should.equal('1988-11');
      edtfy('décembre 1988').should.equal('1988-12');
      edtfy('decembre 1988').should.equal('1988-12');
    });
    it('should parse \'DD/MM/YYYY\' dates', function() {
      edtfy('29/03/1988').should.equal('1988-03-29');
    });
    it('should parse \'dddd DD/MM/YYYY\' dates', function() {
      edtfy('lundi 29/03/1988').should.equal('1988-03-29');
      edtfy('jeudi 29/03/1988').should.equal('1988-03-29');
    });
    it('should parse \'ddd DD/MM/YYYY\' dates', function() {
      edtfy('ven 29/03/1988').should.equal('1988-03-29');
      edtfy('mer 29/03/1988').should.equal('1988-03-29');
    });
    it('should parse \'le DD/MM/YYYY\' dates', function() {
      edtfy('le 29/03/1988').should.equal('1988-03-29');
    });
    it('should parse \'D/M/YYYY\' dates', function() {
      edtfy('1/3/1988').should.equal('1988-03-01');
    });
    it('should parse \'le D/M/YYYY\' dates', function() {
      edtfy('le 1/3/1988').should.equal('1988-03-01');
    });
    it('should parse \'DD MMM YYYY\' dates', function() {
      edtfy('29 mar 1988').should.equal('1988-03-29');
    });
    it('should parse \'le DD MMM YYYY\' dates', function() {
      edtfy('le 29 mar 1988').should.equal('1988-03-29');
    });
    it('should parse \'DD MMMM YYYY\' dates', function() {
      edtfy('29 mars 1988').should.equal('1988-03-29');
    });
    it('should parse \'le DD MMMM YYYY\' dates', function() {
      edtfy('le 29 mars 1988').should.equal('1988-03-29');
    });
    it('should parse \'D MMM YYYY\' dates', function() {
      edtfy('1 mar 1988').should.equal('1988-03-01');
    });
    it('should parse \'le D MMM YYYY\' dates', function() {
      edtfy('le 1 mar 1988').should.equal('1988-03-01');
    });
    it('should parse \'D MMMM YYYY\' dates', function() {
      edtfy('1 mars 1988').should.equal('1988-03-01');
    });
    it('should parse \'le D MMMM YYYY\' dates', function() {
      edtfy('le 1 mars 1988').should.equal('1988-03-01');
    });
    it('should not parse invalid dates', function() {
      (function(){edtfy('32/01/1988')}).should.throw(Error);
      (function(){edtfy('0/01/1988')}).should.throw(Error);
      (function(){edtfy('01/13/1988')}).should.throw(Error);
      (function(){edtfy('30/02/1988')}).should.throw(Error);
      (function(){edtfy('31/04/1988')}).should.throw(Error);
      (function(){edtfy('31/06/1988')}).should.throw(Error);
      (function(){edtfy('31/09/1988')}).should.throw(Error);
      (function(){edtfy('31/11/1988')}).should.throw(Error);
      (function(){edtfy('31/11/0')}).should.throw(Error);
    });
  });
  describe('interval: the parser', function() {
    // Entre ... et ...
    it('should parse \'entre YYYY et YYYY\' intervals', function () {
      edtfy('entre 1987 et 1988').should.equal('1987/1988');
    });
    it('should parse \'entre (le) D(D)/M(M)/YYYY et (le) D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('entre 28/03/1988 et 30/03/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('entre 1/03/1988 et 3/03/1988').should.equal('1988-03-01/1988-03-03');
      edtfy('entre le 28/03/1988 et le 30/03/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('entre le 1/03/1988 et le 3/03/1988').should.equal('1988-03-01/1988-03-03');
    });
    // De ... à ...
    it('should parse \'de YYYY (à|a) YYYY\' intervals', function () {
      edtfy('de 1987 à 1988').should.equal('1987/1988');
      edtfy('1987 à 1988').should.equal('1987/1988');
      edtfy('de 1987 a 1988').should.equal('1987/1988');
      edtfy('1987 a 1988').should.equal('1987/1988');
    });
    it('should parse \'de M(M)/YYYY (à|a) M(M)/YYYY\' intervals', function () {
      edtfy('de 02/1988 à 04/1988').should.equal('1988-02/1988-04');
      edtfy('de 02/1988 a 04/1988').should.equal('1988-02/1988-04');
      edtfy('de 2/1988 à 4/1988').should.equal('1988-02/1988-04');
      edtfy('de 2/1988 a 4/1988').should.equal('1988-02/1988-04');
    });
    it('should parse \'de MMM YYYY (à|a) MMM YYYY\' intervals', function () {
      edtfy('de février 1988 à avril 1988').should.equal('1988-02/1988-04');
      edtfy('de février 1988 a avril 1988').should.equal('1988-02/1988-04');
    });
    it('should parse \'de D(D)/M(M)/YYYY (à|a) D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('de 28/03/1988 à 30/03/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('de 28/03/1988 a 30/03/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('de 1/03/1988 à 3/03/1988').should.equal('1988-03-01/1988-03-03');
      edtfy('de 1/03/1988 a 3/03/1988').should.equal('1988-03-01/1988-03-03');
      edtfy('de 1/3/1988 à 3/3/1988').should.equal('1988-03-01/1988-03-03');
      edtfy('de 1/3/1988 a 3/3/1988').should.equal('1988-03-01/1988-03-03');
    });
    // Du ... au ...
    it('should parse \'du D(D)/M(M)/YYYY au D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('du 28/03/1988 au 30/03/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('du 1/03/1988 au 3/03/1988').should.equal('1988-03-01/1988-03-03');
    });
    it('should parse \'du D(D)/M(M)/YYYY au D(D) MMM YYYY\' intervals', function () {
      edtfy('du 28/03/1988 au 30 mars 1988').should.equal('1988-03-28/1988-03-30');
      edtfy('du 1/03/1988 au 30 mars 1988').should.equal('1988-03-01/1988-03-30');
      edtfy('du 1/3/1988 au 30 mars 1988').should.equal('1988-03-01/1988-03-30');
      edtfy('du 1/03/1988 au 2 mars 1988').should.equal('1988-03-01/1988-03-02');
      edtfy('du 1/3/1988 au 2 mars 1988').should.equal('1988-03-01/1988-03-02');
    });
    it('should parse \'du D(D) MMM YYYY au D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('du 28 mars 1988 au 30/03/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('du 1 mars 1988 au 30/03/1988').should.equal('1988-03-01/1988-03-30');
      edtfy('du 1 mars 1988 au 30/3/1988').should.equal('1988-03-01/1988-03-30');
      edtfy('du 1 mars 1988 au 2/03/1988').should.equal('1988-03-01/1988-03-02');
      edtfy('du 1 mars 1988 au 2/3/1988').should.equal('1988-03-01/1988-03-02');
    });
    // ... - ...
    it('should parse \'D(D)/M(M)/YYYY - D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('28/03/1988 - 30/03/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('1/03/1988 - 3/03/1988').should.equal('1988-03-01/1988-03-03');
    });
    it('should parse \'D(D)/M(M)/YYYY - D(D) MMM YYYY\' intervals', function () {
      edtfy('28/03/1988 - 30 mars 1988').should.equal('1988-03-28/1988-03-30');
      edtfy('1/03/1988 - 30 mars 1988').should.equal('1988-03-01/1988-03-30');
      edtfy('1/3/1988 - 30 mars 1988').should.equal('1988-03-01/1988-03-30');
      edtfy('1/03/1988 - 2 mars 1988').should.equal('1988-03-01/1988-03-02');
      edtfy('1/3/1988 - 2 mars 1988').should.equal('1988-03-01/1988-03-02');
    });
    it('should parse \'D(D) MMM YYYY - D(D)/M(M)/YYYY\' intervals', function () {
      edtfy('28 mars 1988 - 30/03/1988').should.equal('1988-03-28/1988-03-30');
      edtfy('1 mars 1988 - 30/03/1988').should.equal('1988-03-01/1988-03-30');
      edtfy('1 mars 1988 - 30/3/1988').should.equal('1988-03-01/1988-03-30');
      edtfy('1 mars 1988 - 2/03/1988').should.equal('1988-03-01/1988-03-02');
      edtfy('1 mars 1988 - 2/3/1988').should.equal('1988-03-01/1988-03-02');
    });
    // Various
    it('should parse various combinations', function () {
      edtfy('de sep 1988 au 30/04/1988').should.equal('1988-09/1988-04-30');
      edtfy('de OCT 1988 au 30/04/1988').should.equal('1988-10/1988-04-30');
      edtfy('de mars 1988 au 30 avril 1988').should.equal('1988-03/1988-04-30');
      edtfy('de mars 1988 à 1989').should.equal('1988-03/1989');
      edtfy('de 1988 au 3/1/1989').should.equal('1988/1989-01-03');
    });
  });
});
