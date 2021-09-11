/**
 * `parseIntStrict(someString)` is a stricter replacement for `parseInt(someString, 10)`.
 * 
 * * `parseIntStrict(someString)` returns an integral number (let’s call it `int`) if and only if all of the following is true:
 *   * `someString` is exactly equal to `int.toString()`.
 *   * `int` is within the range [`Number.MIN_SAFE_INTEGER` .. `Number.MAX_SAFE_INTEGER`].
 * * In all other cases `parseIntStrict(someString)` returns `NaN`.
 * * If `someString` is not of type `string`, than the behavior of `parseIntStrict(someString)` is not defined.
 * 
 * @param string the string to parse
 * @returns the number that corresponds to the given string or `NaN`
 */
export function parseIntStrict(string: string): number {
   const int = parseInt(string, 10);

   if (isNaN(int) || int < Number.MIN_SAFE_INTEGER || int > Number.MAX_SAFE_INTEGER || int.toString() !== string) {
      return Number.NaN;
   }

   return int;
}
