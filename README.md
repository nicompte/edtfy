# edtfy (bring your own pronunciation)

[![Circle CI](https://circleci.com/gh/nicompte/edtfy.svg?style=svg)](https://circleci.com/gh/nicompte/edtfy)

edtfy is a parser that transforms user input into the [edtf](http://www.loc.gov/standards/datetime/pre-submission.html) format.

## Install

```
npm install edtfy   #npm
bower install edtfy #bower
```

## Usage

### parse

```js
edtfy = require('edtfy');
edtfy.locale('fr');
edtfy('29 mars 1988'); // 1988-03-29
```

### locale

`edtfy.locale(locale)`: define the locale

`edtfy.locale()`: retrieve the locale

## Compatibility

### Level 0

#### 5.1.1 Date

input|output
-----|------
2008 | 2008
december 1988 | 2008-12
02/03/1988 | 2001-02-03

#### 5.1.2 Date and Time

Not supported for now.

#### 5.1.3 Interval

input|output
-----|------
from 1964 to 2008 | 1964/2008
June 2004 - August 2008 | 2004-06/2008-08
2/1/2004 / 2/8/2005 | 2004-02-01/2008-02-08
02/01/2004-2005 | 2004-02-01/2005
from 2005 to June 2006 | 2005/2006-02

### Level 1

#### 5.2.1 Uncertain/Approximate

input|output
-----|------
1984? | 1984?
June 2004? | 2004-06?
June the 11th, 2004? | 2004-06-11?
around 1984 | 1984~
about 1984? | 1984?~

#### 5.2.2 Unspecified

input|output
-----|------
199u | 199u
1999-uu | 1999-uu
1999-01-uu | 1999-01-uu
1999-uu-uu | 1999-uu-uu

#### 5.2.3. Extended Interval (L1)

input|output
-----|------
from 06/01/2004 to unknown | 2004-06-01/unknown
from 01/01/2004 to open | 2004-01-01/open
from around 1984 to June 2004 | 1984~/2004-06
1984 - around June 2004 | 1984/2004-06~
1984? - ~2004? | 1984?/2004?~

#### 5.2.4 Year Exceeding Four Digits (L1)

input|output
-----|------
170000002 | y170000002
-170000002 | y-170000002

#### 5.2.5 Season

input|output
-----|------
Spring 2001 | 2001-21

### Level 2

#### 5.3.1 Partial Uncertain/Approximate

Not supported for now.

#### 5.3.2 Partial Unspecified

input|output
-----|------
12/25/156u | 156u-12-25
12/25/156uu | 15uu-12-25
12/uu/15uu | 15uu-12-uu
uu/25/1560 | 1560-uu-25

#### 5.3.3 One of a Set

The `..` feature is only supported of `before` and `after` for now.

input|output
-----|------
1667 or 1668 or 1670 | [1667,1668,1670]
Jan 1760 or Feb 1760 or December 1760 | [1760-01,1760-02,1760-12]
1667 or 12/1760 | [1667,1760-12]
before 1930 | [..,1930]
after march 2004 | [2004-03,..]

#### 5.3.4 Multiple Dates

The `..` feature is not supported for now.

input|output
-----|------
1667 and 1668 and 1670 | {1667,1668,1670}
1960 and December 1961 | {1960,1961-12}

#### 5.4.5 Masked Precision

input|output
-----|------
196x | 196x
19xx  | 19xx

#### 5.3.6 Extended Interval (L2)

Not supported for now.

## License

MIT © [Nicolas Barbotte](http://barbotte.net)
