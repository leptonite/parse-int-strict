@leptonite/parse-int-strict
===========================

`@leptonite/parse-int-strict` provides the function `parseIntStrict` which parses a string into an integer.
It is much stricter than `parseInt` which means it rejects a lot of inputs that `parseInt` accepts.


Motivation
----------

I used to use `parseInt(someString)` or `parseInt(someString, 10)` to parse strings containing integral numbers.
And I check if parsing has been successful by checking if the result is NaN via `Number.isNaN(result)`.

But some day I was suprised about the behavior of `parseInt`: It happily acceps inputs that do not look like integral numbers to me.
`parseInt(someString)` seems to work like “if `someString` is not exactly an integral number let’s just parse some part of `someString` that is”,
but I want “if `someString` is not exactly an integral number let’s just reject it by returning `NaN`”.

While `Number(someString)` is stricter than `parseInt(someString, 10)` in some cases it’s not an alternative because it parses fractional numbers.

Examples:

|                             |                   `s` |       `parseInt(s)` |   `parseInt(s, 10)` |         `Number(s)` |
|-----------------------------|----------------------:|--------------------:|--------------------:|--------------------:|
| fractional numbers          |               `'0.5'` |                 `0` |                 `0` |               `0.5` |
| trailing non-digits         |                `'1a'` |                 `1` |                 `1` |               `NaN` |
| trailing non-digits / hex   |              `'0xDF'` |               `223` |                 `0` |               `223` |
| scientific notation         |               `'1e2'` |                 `1` |                 `1` |               `100` |
| leading whitespace          |        `'\t \n \r 1'` |                 `1` |                 `1` |                 `1` |
| `> Number.MAX_SAFE_INTEGER` |  `'9007199254740993'` |  `9007199254740992` |  `9007199254740992` |  `9007199254740992` |
| `< Number.MIN_SAFE_INTEGER` | `'-9007199254740993'` | `-9007199254740992` | `-9007199254740992` | `-9007199254740992` |

Although this behavior matches the spec it is just not what I want.


parseIntStrict
--------------

`parseIntStrict(someString)` is a stricter replacement for `parseInt(someString, 10)`.
It returns `NaN` in all examples above.
There are in fact even more cases where it returns `NaN`.

To be more specific:

* `parseIntStrict(someString)` returns an integral number (let’s call it `int`) if and only if all of the following is true:
  * `someString` is exactly equal to `int.toString()`.
  * `int` is within the range [`Number.MIN_SAFE_INTEGER` .. `Number.MAX_SAFE_INTEGER`].
* In all other cases `parseIntStrict(someString)` returns `NaN`.
* If `someString` is not of type `string`, than the behavior of `parseIntStrict(someString)` is not defined.

It follows in particular:

* `parseIntStrict(someString)` always returns either an integral number or `NaN`, it never throws.
* If `parseIntStrict(someString)` returns an integral number, than it returns the same number as `parseInt(someString, 10)`.
