(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.edtfy = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function() {

var locale = 'en';

var parser = _dereq_('./tmp/edtfy.js');

var fr = _dereq_('./locales/fr');
var en = _dereq_('./locales/en');

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
    options.locale = options.locale || locale;
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
  },
  locale: function(newLocale) {
    if (newLocale) {
      locale = newLocale;
    } else {
      return locale;
    }
  }
}

})();

},{"./locales/en":2,"./locales/fr":3,"./tmp/edtfy.js":4}],2:[function(_dereq_,module,exports){

module.exports = {
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
  between1: 'between|bet|from',
  between2: 'to',
  and: 'and',
  or: 'or',
  unknown: 'unknown|ukn',
  open: 'open'
};
},{}],3:[function(_dereq_,module,exports){

module.exports = {
  days: 'lundi|lun|mardi|mar|mercredi|mer|jeudi|jeu|vendredi|ven|samedi|sam|dimanche|dim',
  months: [
    'janvier|jan', 'fevrier|fev', 'mars|mar', 'avril|avr',
    'mai', 'juin|jun|jui', 'juillet|jul|juil', 'aout|aou',
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
},{}],4:[function(_dereq_,module,exports){
module.exports = (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleIndices = { start: 0 },
        peg$startRuleIndex   = 0,

        peg$consts = [
          "~",
          { type: "literal", value: "~", description: "\"~\"" },
          " ",
          { type: "literal", value: " ", description: "\" \"" },
          function(d) {
                return d + '~'
              },
          "B1 ",
          { type: "literal", value: "B1 ", description: "\"B1 \"" },
          " B2 ",
          { type: "literal", value: " B2 ", description: "\" B2 \"" },
          " A ",
          { type: "literal", value: " A ", description: "\" A \"" },
          function(date1, date2) {
                return date1 + '/' + date2
              },
          "-",
          { type: "literal", value: "-", description: "\"-\"" },
          " / ",
          { type: "literal", value: " / ", description: "\" / \"" },
          " O ",
          { type: "literal", value: " O ", description: "\" O \"" },
          function(date1, date2) {
                var year = date2.split('-')[0]
                var month = date2.split('-')[1]
                return '[' + year + '-' + month + '-' + date1 + ',' + date2 + ']'
              },
          function(date1, date2) {
                var year = date2.split('-')[0]
                return '[' + year + '-' + date1.m + '-' + date1.d + ',' + date2 + ']'
              },
          function(date1, date2) {
                return '[' + date2[2] + '-' + date1 + ',' + date2[2] + '-' + date2[0] + ']'
              },
          function(date1, d) { return d },
          function(date1, date2) {
                return '[' + date1 + ',' + date2 + ']'
              },
          function(date1, date2) {
                var year = date2.split('-')[0]
                var month = date2.split('-')[1]
                return '{' + year + '-' + month + '-' + date1 + ',' + date2 + '}'
              },
          function(date1, date2) {
                var year = date2.split('-')[0]
                return '{' + year + '-' + date1.m + '-' + date1.d + ',' + date2 + '}'
              },
          function(date1, date2) {
                return '{' + date2[2] + '-' + date1 + ',' + date2[2] + '-' + date2[0] + '}'
              },
          function(date1, date2) {
                return '{' + date1 + ',' + date2 + '}'
              },
          "?",
          { type: "literal", value: "?", description: "\"?\"" },
          function(d, q) {
              validateDate(d);
              d = q ? d + '?' : d;
              return d;
            },
          function() { return options.format === 'mdy' },
          function(d) { return d; },
          function() { return options.format === 'dmy' },
          "/",
          { type: "literal", value: "/", description: "\"/\"" },
          function(m, d) {
            return m[0] + '-' + d
          },
          function(md, y) { return y + '-' + md },
          function(d, m) {
            return {d:d, m:m[1]}
          },
          function(d, my) { return my + '-' + d },
          function(m, y) { return y + '-' + m },
          function(s, y) {
            if(s){
              y = '-' + y
            }
            if(!s && y.length > 4 || s && y.length > 5){
              y = 'y' + y
            }
            return y
          },
          function(d, u) {
           var a = d || [];
           return a.concat(u).join('')
          },
          "M",
          { type: "literal", value: "M", description: "\"M\"" },
          function(m) { return m },
          "S",
          { type: "literal", value: "S", description: "\"S\"" },
          function(s) { return s },
          " C",
          { type: "literal", value: " C", description: "\" C\"" },
          function(d) { return parseInt(d.join(''), 10) - 1 + 'xx' },
          function(r) { return parseInt(deromanize(r.join('')), 10) - 1 + 'xx' },
          function(s, y) { return y + '-' + s },
          function(a, b) { return a + b;},
          function(a, b) { return a + b; },
          function(d) {return '0' + d},
          "u",
          { type: "literal", value: "u", description: "\"u\"" },
          function() { return 'uu' },
          "*",
          { type: "literal", value: "*", description: "\"*\"" },
          "x",
          { type: "literal", value: "x", description: "\"x\"" },
          function() { return 'xx' },
          /^[0-9]/,
          { type: "class", value: "[0-9]", description: "[0-9]" },
          /^[a-z]/,
          { type: "class", value: "[a-z]", description: "[a-z]" },
          function() { return 'u' },
          /^[0-1]/,
          { type: "class", value: "[0-1]", description: "[0-1]" },
          /^[0-3]/,
          { type: "class", value: "[0-3]", description: "[0-3]" },
          "U",
          { type: "literal", value: "U", description: "\"U\"" },
          function() { return 'unknown' },
          "OP",
          { type: "literal", value: "OP", description: "\"OP\"" },
          function() { return 'open' },
          /^[ivxlcdm]/,
          { type: "class", value: "[ivxlcdm]", description: "[ivxlcdm]" }
        ],

        peg$bytecode = [
          peg$decode(";\".5 &;!./ &;#.) &;$.# &;%"),
          peg$decode("%2 \"\"6 7!/E#2\"\"\"6\"7#.\" &\"/1$;%/($8#:$#! )(#'#(\"'#&'#"),
          peg$decode("%2%\"\"6%7&/\\#;%/S$2'\"\"6'7(.) &2)\"\"6)7*/8$;<.# &;%/)$8$:+$\"\" )($'#(#'#(\"'#&'#.\xF5 &%2%\"\"6%7&.\" &\"/P#;%/G$2'\"\"6'7(/8$;<.# &;%/)$8$:+$\"\" )($'#(#'#(\"'#&'#.\xAD &%;%/o#2\"\"\"6\"7#.\" &\"/[$2,\"\"6,7-/L$2\"\"\"6\"7#.\" &\"/8$;<.# &;%/)$8%:+%\"$ )(%'#($'#(#'#(\"'#&'#.Q &%;%/G#2.\"\"6.7//8$;<.# &;%/)$8#:+#\"\" )(#'#(\"'#&'#"),
          peg$decode("%;4/A#20\"\"6071/2$;%/)$8#:2#\"\" )(#'#(\"'#&'#.\u0118 &%;*/A#20\"\"6071/2$;%/)$8#:3#\"\" )(#'#(\"'#&'#.\xEA &%;0/v#20\"\"6071/g$%;0/N#$2\"\"\"6\"7#/,#0)*2\"\"\"6\"7#&&&#/,$;-/#$+#)(#'#(\"'#&'#/)$8#:4#\"\" )(#'#(\"'#&'#.\x87 &%;%/}#$%20\"\"6071/2#;%/)$8\":5\"\"$ )(\"'#&'#/E#0B*%20\"\"6071/2#;%/)$8\":5\"\"$ )(\"'#&'#&&&#/)$8\":6\"\"! )(\"'#&'#"),
          peg$decode("%;4/A#2)\"\"6)7*/2$;%/)$8#:7#\"\" )(#'#(\"'#&'#.\u0118 &%;*/A#2)\"\"6)7*/2$;%/)$8#:8#\"\" )(#'#(\"'#&'#.\xEA &%;0/v#2)\"\"6)7*/g$%;0/N#$2\"\"\"6\"7#/,#0)*2\"\"\"6\"7#&&&#/,$;-/#$+#)(#'#(\"'#&'#/)$8#:9#\"\" )(#'#(\"'#&'#.\x87 &%;%/}#$%2)\"\"6)7*/2#;%/)$8\":5\"\"$ )(\"'#&'#/E#0B*%2)\"\"6)7*/2#;%/)$8\":5\"\"$ )(\"'#&'#&&&#/)$8\"::\"\"! )(\"'#&'#"),
          peg$decode(";!.) &;;.# &;&"),
          peg$decode("%;'/[#%2\"\"\"6\"7#.\" &\"/2#2;\"\"6;7</#$+\")(\"'#&'#.\" &\"/)$8\":=\"\"! )(\"'#&'#"),
          peg$decode(";1. &%9:>  -\"\"&!&#/1#;)/($8\":?\"! )(\"'#&'#.W &%9:@  -\"\"&!&#/1#;+/($8\":?\"! )(\"'#&'#./ &;2.) &;,.# &;-"),
          peg$decode("%%;//2#2\"\"\"6\"7#/#$+\")(\"'#&'#.< &%;3/2#2A\"\"6A7B/#$+\")(\"'#&'#/2#;4/)$8\":C\"\"! )(\"'#&'#"),
          peg$decode("%;(/M#2A\"\"6A7B.) &2\"\"\"6\"7#/2$;-/)$8#:D#\"\" )(#'#(\"'#&'#"),
          peg$decode("%;4/j#%2\"\"\"6\"7#/,#;//#$+\")(\"'#&'#.< &%2A\"\"6A7B/,#;3/#$+\")(\"'#&'#/)$8\":E\"\"! )(\"'#&'#"),
          peg$decode("%;4/M#2A\"\"6A7B.) &2\"\"\"6\"7#/2$;,/)$8#:F#\"\" )(#'#(\"'#&'#"),
          peg$decode("%;//A#2\"\"\"6\"7#/2$;-/)$8#:G#\"\" )(#'#(\"'#&'#.K &%;3/A#2A\"\"6A7B/2$;-/)$8#:G#\"\" )(#'#(\"'#&'#"),
          peg$decode("%2,\"\"6,7-.\" &\"/2#;./)$8\":H\"\"! )(\"'#&'#"),
          peg$decode("%$;6/&#0#*;6&&&#.5 &%<2A\"\"6A7B=.##&&!&'#/Q#$;80#*;8&.5 &%<2A\"\"6A7B=.##&&!&'#/)$8\":I\"\"! )(\"'#&'#"),
          peg$decode("%2J\"\"6J7K/K#%%;6/,#;6/#$+\")(\"'#&'#/\"!&,)/($8\":L\"! )(\"'#&'#"),
          peg$decode("%2M\"\"6M7N/K#%%;6/,#;6/#$+\")(\"'#&'#/\"!&,)/($8\":O\"! )(\"'#&'#"),
          peg$decode("%$;6/&#0#*;6&&&#/7#2P\"\"6P7Q/($8\":R\"!!)(\"'#&'#.N &%$;=/&#0#*;=&&&#/7#2P\"\"6P7Q/($8\":S\"!!)(\"'#&'#"),
          peg$decode("%;0/T#$2\"\"\"6\"7#/,#0)*2\"\"\"6\"7#&&&#/2$;-/)$8#:T#\"\" )(#'#(\"'#&'#"),
          peg$decode("%;9/2#;8/)$8\":U\"\"! )(\"'#&'#.< &%;9/2#;6/)$8\":V\"\"! )(\"'#&'#.# &;5"),
          peg$decode("%;:/2#;8/)$8\":U\"\"! )(\"'#&'#.< &%;:/2#;6/)$8\":V\"\"! )(\"'#&'#.# &;5"),
          peg$decode("%;6/' 8!:W!! ).b &%2X\"\"6X7Y/& 8!:Z! ).K &%2[\"\"6[7\\/& 8!:Z! ).4 &%2]\"\"6]7^/& 8!:_! )"),
          peg$decode("4`\"\"5!7a"),
          peg$decode("4b\"\"5!7c"),
          peg$decode("2X\"\"6X7Y.@ &2]\"\"6]7^.4 &%2[\"\"6[7\\/& 8!:d! )"),
          peg$decode(";8.) &4e\"\"5!7f"),
          peg$decode(";8.) &4g\"\"5!7h"),
          peg$decode("%2i\"\"6i7j/& 8!:k! )"),
          peg$decode("%2l\"\"6l7m/& 8!:n! )"),
          peg$decode("4o\"\"5!7p")
        ],

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleIndices)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleIndex = peg$startRuleIndices[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$decode(s) {
      var bc = new Array(s.length), i;

      for (i = 0; i < s.length; i++) {
        bc[i] = s.charCodeAt(i) - 32;
      }

      return bc;
    }

    function peg$parseRule(index) {
      var bc    = peg$bytecode[index],
          ip    = 0,
          ips   = [],
          end   = bc.length,
          ends  = [],
          stack = [],
          params, i;

      while (true) {
        while (ip < end) {
          switch (bc[ip]) {
            case 0:
              stack.push(peg$consts[bc[ip + 1]]);
              ip += 2;
              break;

            case 1:
              stack.push(void 0);
              ip++;
              break;

            case 2:
              stack.push(null);
              ip++;
              break;

            case 3:
              stack.push(peg$FAILED);
              ip++;
              break;

            case 4:
              stack.push([]);
              ip++;
              break;

            case 5:
              stack.push(peg$currPos);
              ip++;
              break;

            case 6:
              stack.pop();
              ip++;
              break;

            case 7:
              peg$currPos = stack.pop();
              ip++;
              break;

            case 8:
              stack.length -= bc[ip + 1];
              ip += 2;
              break;

            case 9:
              stack.splice(-2, 1);
              ip++;
              break;

            case 10:
              stack[stack.length - 2].push(stack.pop());
              ip++;
              break;

            case 11:
              stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
              ip += 2;
              break;

            case 12:
              stack.push(input.substring(stack.pop(), peg$currPos));
              ip++;
              break;

            case 13:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1]) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 14:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1] === peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 15:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (stack[stack.length - 1] !== peg$FAILED) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 16:
              if (stack[stack.length - 1] !== peg$FAILED) {
                ends.push(end);
                ips.push(ip);

                end = ip + 2 + bc[ip + 1];
                ip += 2;
              } else {
                ip += 2 + bc[ip + 1];
              }

              break;

            case 17:
              ends.push(end);
              ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);

              if (input.length > peg$currPos) {
                end = ip + 3 + bc[ip + 1];
                ip += 3;
              } else {
                end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                ip += 3 + bc[ip + 1];
              }

              break;

            case 18:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 19:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 20:
              ends.push(end);
              ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);

              if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
                end = ip + 4 + bc[ip + 2];
                ip += 4;
              } else {
                end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                ip += 4 + bc[ip + 2];
              }

              break;

            case 21:
              stack.push(input.substr(peg$currPos, bc[ip + 1]));
              peg$currPos += bc[ip + 1];
              ip += 2;
              break;

            case 22:
              stack.push(peg$consts[bc[ip + 1]]);
              peg$currPos += peg$consts[bc[ip + 1]].length;
              ip += 2;
              break;

            case 23:
              stack.push(peg$FAILED);
              if (peg$silentFails === 0) {
                peg$fail(peg$consts[bc[ip + 1]]);
              }
              ip += 2;
              break;

            case 24:
              peg$savedPos = stack[stack.length - 1 - bc[ip + 1]];
              ip += 2;
              break;

            case 25:
              peg$savedPos = peg$currPos;
              ip++;
              break;

            case 26:
              params = bc.slice(ip + 4, ip + 4 + bc[ip + 3]);
              for (i = 0; i < bc[ip + 3]; i++) {
                params[i] = stack[stack.length - 1 - params[i]];
              }

              stack.splice(
                stack.length - bc[ip + 2],
                bc[ip + 2],
                peg$consts[bc[ip + 1]].apply(null, params)
              );

              ip += 4 + bc[ip + 3];
              break;

            case 27:
              stack.push(peg$parseRule(bc[ip + 1]));
              ip += 2;
              break;

            case 28:
              peg$silentFails++;
              ip++;
              break;

            case 29:
              peg$silentFails--;
              ip++;
              break;

            default:
              throw new Error("Invalid opcode: " + bc[ip] + ".");
          }
        }

        if (ends.length > 0) {
          end = ends.pop();
          ip = ips.pop();
        } else {
          break;
        }
      }

      return stack[0];
    }


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


    peg$result = peg$parseRule(peg$startRuleIndex);

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})();
},{}]},{},[1])(1)
});