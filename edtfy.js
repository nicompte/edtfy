
var parser = require('./tmp/edtfy.js');

var fr = {
  days: 'lundi|lun|mardi|mar|mercredi|mer|jeudi|jeu|vendredi|ven|samedi|sam|dimanche|dim',
  months: [
    'janvier|jan', 'fevrier|fev', 'mars|mar', 'avril|avr',
    'mai', 'juin|jui', 'juillet|juil', 'aout|aou',
    'septembre|sep', 'octobre|oct', 'novembre|nov', 'decembre|dec'
  ],
  seasons: ['printemps', 'ete', 'automne', 'hiver'],
  century: 'siecle',
  format: ['dmy'],
  around: 'vers|environ|env|autour de',
  between1: 'entre|du|de',
  between2: 'au|a',
  and: 'et',
  or: 'ou',
  unknown: 'inconnue?',
  open: 'en cours'
};

var en = {
  days: 'monday|mon|tuesday|tue|wednesday|wed|thursday|thu|friday|fri|saturday|sat|sunday|sun',
  months: [
    'january|jan', 'february|feb', 'march|mar', 'april|apr',
    'may', 'june|jun', 'july|jul', 'august|aug',
    'september|sep', 'october|oct', 'november|nov', 'december|dec'
  ],
  seasons: ['spring', 'summer', 'autumn|fall', 'winter'],
  century: 'century',
  format: ['mdy', 'dmy'],
  around: 'around|about|abt|close to',
  between1: 'between|from',
  between2: 'to',
  and: 'and',
  or: 'or',
  unknown: 'unknown|ukn',
  open: 'open'
};

var i18n = function(string, localeData) {
  localeData.months.forEach(function(month, i){
    i++;
    i = i >9 ? i : '0' + i;
    string = string.replace(new RegExp('\\b' + month + '\\b', 'g'), 'M' + i);
  });
  localeData.seasons.forEach(function(season, i){
    i++;
    i = '2' + i;
    string = string.replace(new RegExp('\\b' + season + '\\b', 'g'), 'S' + i);
  });
  string = string.replace(new RegExp('\\b' + localeData.century + '\\b', 'g'), 'C');
  string = string.replace(new RegExp('\\b' + localeData.around + '\\b', 'g'), '~');
  string = string.replace(new RegExp('\\b' + localeData.between1 + '\\b', 'g'), 'B1');
  string = string.replace(new RegExp('\\b' + localeData.between2 + '\\b', 'g'), 'B2');
  string = string.replace(new RegExp('\\b' + localeData.and + '\\b', 'g'), 'A');
  string = string.replace(new RegExp('\\b' + localeData.or + '\\b', 'g'), 'O');
  string = string.replace(new RegExp('\\b' + localeData.unknown + '\\b', 'g'), 'U');
  string = string.replace(new RegExp('\\b' + localeData.open + '\\b', 'g'), 'OP');
  string = string.replace(new RegExp('\\b' + localeData.days + '\\b', 'g'), '');
  return string;
};

module.exports = {
  parse: function(string, options) {
    options = options || {};
    options.locale = options.locale || 'en';
    var localeData = options.locale === 'en' ? en : fr;
    string = string.trim()
      .toLowerCase()
      .replace(/ +/g, ' ')
      .replace(/[,.]/g, '')
      .replace(/[àáâãäå]/g,"a")
      .replace(/ç/g,"c")
      .replace(/[èéêë]/g,"e")
      .replace(/[ìíîï]/g,"i")
      .replace(/[òóôõö]/g,"o")
      .replace(/[ùúûü]/g,"u")
      .replace(/[ýÿ]/g,"y")
      .replace(/\ble\b/g, '').replace(/\ben\b\s*(\d)/g, '$1').replace(/\bl'\b/g, '').replace(/\bl'an\b/g, '')
      .replace(/(\d+)\s?eme\b/g, '$1').replace(/(\d+)\s?er\b/g, '$1').replace(/(\d+)\s?e\b/g, '$1')
      .replace(/\bthe\b/g, '').replace(/\bin\b/g, '')
      .replace(/(\d+)\s?st\b/g, '$1').replace(/(\d+)\s?nd\b/g, '$1').replace(/(\d+)\s?rd\b/g, '$1').replace(/(\d+)\s?th\b/g, '$1')
      .replace(/ +/g, ' ');
      string = i18n(string, localeData).trim()
      .replace(/([ivxlcdm]+)\s?eme C/g, '$1 C').replace(/([ivxlcdm]+)\s?er C/g, '$1 C').replace(/([ivxlcdm]+)\s?e C/g, '$1 C')
      .replace(/([ivxlcdm]+)\s?st C/g, '$1 C').replace(/([ivxlcdm]+)\s?nd C/g, '$1 C').replace(/([ivxlcdm]+)\s?rd C/g, '$1 C').replace(/([ivxlcdm]+)\s?th C/g, '$1 C');
    var result;
    localeData.format.forEach(function(format, i) {
      try {
        if (!result) {
          result = parser.parse(string, {format: format});
        }
      } catch (e) {
        if (i === localeData.format.length - 1) {
          throw e;
        }
      }
    });
    return result;
  }
};
