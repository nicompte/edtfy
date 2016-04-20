{
// Functions

  // Transform roman number to standard number
  var deromanize = function(str) {
    str = str.toUpperCase();
    var  validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
    token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
    key = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1},
    num = 0, m;
    if (!(str && validator.test(str))) {
      throw new Error('Invalid roman number');
    }
    while (m = token.exec(str)) {
      num += key[m[0]];
    }
    return num;
  }

  var cal = {
    1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30,
    7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
  }

  var toInt = function(value) {
    if(/^(\-|\+)?([0-9]+)$/.test(value)) return Number(value);
    return NaN;
  }

  function validateDate (date) {
    date = date.replace(/[~\?y]/g, '').replace(/^-/, '');
    var parts = date.split('-'), month, day;
    var year = toInt(parts[0]);
    if(!toInt(year) && year === 0) {
      throw new Error('Invalid year');
    }
    // yyyy-mm-dd
    if (parts.length == 3) {
      month = toInt(parts[1]);
      day = toInt(parts[2]);
      // yyyy-mm
    } else if (parts.length == 2){
      month = toInt(parts[1]);
    }
    if (parts.length > 1 && day != null && !isNaN(day) && !isNaN(month)) {
      // day and month are defined and integers
      if (cal[month] == null) throw new Error('Invalid month');
      if (cal[month] < day || day < 1) throw new Error('Invalid day');
      // day and month are defined
    } else if (day != null) {
      if (!isNaN(month) && (month === 0 || month > 12)) throw new Error('Invalid month');
      if (!isNaN(day) && (day === 0 || day > 31)) throw new Error('Invalid day');
      // seasons
    } else if (month != null){
      if (!isNaN(month) && !((month > 0 && month < 13) || (month > 20 && month < 25))) throw new Error('Invalid month');
    }
  }
}

start
  = interval
  // around
  / or
  / and
  / complexdate

around
  = '~' ' '? d:complexdate_but_around {
      return d + '~'
    }
  / d:complexdate_but_around ' '? '~' {
    return d + '~'
  }

interval
  = 'B1 ' date1:complexdate (' B2 ' / ' A ') date2:(OPEN / complexdate) {
      return date1 + '/' + date2
    }
  / 'B1 '? date1:complexdate ' B2 ' date2:(OPEN / complexdate) {
      return date1 + '/' + date2
    }
  / date1:complexdate ' '? '-' ' '? date2:(OPEN / complexdate) {
      return date1 + '/' + date2
    }
  / date1:complexdate ' / ' date2:(OPEN / complexdate) {
      return date1 + '/' + date2
    }

or
  = date1:day ' O ' date2:complexdate{
      var year = date2.split('-')[0]
      var month = date2.split('-')[1]
      return '[' + year + '-' + month + '-' + date1 + ',' + date2 + ']'
    }
  / date1:dm ' O ' date2:complexdate{
      var year = date2.split('-')[0]
      return '[' + year + '-' + date1.m + '-' + date1.d + ',' + date2 + ']'
    }
  / date1:season ' O ' date2:(season ' '+ year){
      return '[' + date2[2] + '-' + date1 + ',' + date2[2] + '-' + date2[0] + ']'
    }
  / date1:complexdate date2:(' O ' d:complexdate { return d })+ {
      return '[' + date1 + ',' + date2 + ']'
    }
  / BEFORE + date1:complexdate {
      return '[..,' + date1 + ']'
    }
  / AFTER + date1:complexdate {
      return '[' + date1 + ',..]'
    }

and
  = date1:day ' A ' date2:complexdate{
      var year = date2.split('-')[0]
      var month = date2.split('-')[1]
      return '{' + year + '-' + month + '-' + date1 + ',' + date2 + '}'
    }
  / date1:dm ' A ' date2:complexdate{
      var year = date2.split('-')[0]
      return '{' + year + '-' + date1.m + '-' + date1.d + ',' + date2 + '}'
    }
  / date1:season ' A ' date2:(season ' '+ year){
      return '{' + date2[2] + '-' + date1 + ',' + date2[2] + '-' + date2[0] + '}'
    }
  / date1:complexdate date2:(' A ' d:complexdate { return d })+ {
      return '{' + date1 + ',' + date2 + '}'
    }

complexdate
  = around
  / UK
  / date_uncertain

complexdate_but_around
  = UK
  / date_uncertain

date_uncertain
  = d:date q:(' '? '?')? {
    validateDate(d);
    d = q ? d + '?' : d;
    return d;
  }

date
  = century
  / & { return options.format === 'mdy' } d:mdy { return d; }
  / & { return options.format === 'dmy' } d:dmy { return d; }
  / season_year
  / my
  / year

md = m:(lettermonth ' ' / month '/') d:day {
  return m[0] + '-' + d
}

mdy = md:md ('/' / ' ') y:year { return y + '-' + md }

dm = d:day m:(' ' lettermonth / '/' month ){
  return {d:d, m:m[1]}
}

dmy = d:day ('/' / ' ') my:my { return my + '-' + d }

my
  = m:lettermonth ' ' y:year { return y + '-' + m }
  / m:month '/' y:year { return y + '-' + m }

year = s:'-'? y:yeardigits {
  if(s){
    y = '-' + y
  }
  if(!s && y.length > 4 || s && y.length > 5){
    y = 'y' + y
  }
  return y
}
yeardigits
 = d:(DIGIT+ / !'/') u:(UNKNOWN* / !'/') {
 var a = d || [];
 return a.concat(u).join('')
}

lettermonth = 'M' m:$(DIGIT DIGIT) { return m }

season = 'S' s:$(DIGIT DIGIT) { return s }

// TODO: Allow 20st
century
  = d:DIGIT+ ' C' { return parseInt(d.join(''), 10) - 1 + 'xx' }
  / r:ROMAN+ ' C' { return parseInt(deromanize(r.join('')), 10) - 1 + 'xx' }
  // d:DIGIT+ ""? { return parseInt(d.join(''), 10) - 1 + 'xx'}
  // r:ROMAN+ ""? { return parseInt(deromanize(r.join('')), 10) - 1 + 'xx' }

season_year = s:season ' '+ y:year { return y + '-' + s }

month
  = (a:UNKNOWN_MONTH b:UNKNOWN { return a + b;} / a:UNKNOWN_MONTH b:DIGIT { return a + b; })
  / unknown_day_month
day
  = (a:UNKNOWN_DAY b:UNKNOWN { return a + b;} / a:UNKNOWN_DAY b:DIGIT { return a + b; })
  / unknown_day_month

unknown_day_month
  = d:DIGIT {return '0' + d}
  / 'u' { return 'uu' }
  / '*' { return 'uu' }
  / 'x' { return 'xx' }

DIGIT = [0-9]
CHAR = [a-z]
UNKNOWN = 'u' / 'x' / '*' { return 'u' }
UNKNOWN_MONTH = UNKNOWN / [0-1]
UNKNOWN_DAY = UNKNOWN / [0-3]
UK = 'U' { return 'unknown' }
OPEN = 'OP' { return 'open' }
ROMAN = [ivxlcdm]
BEFORE = 'BF '
AFTER = 'AF '
