import { parseIntStrict } from './parseIntStrict';


test('parses "0"', () => {
   expect(parseIntStrict('0')).toBe(0);
});

test('parses "1"', () => {
   expect(parseIntStrict('1')).toBe(1);
});

test('parses "-1"', () => {
   expect(parseIntStrict('-1')).toBe(-1);
});

test('parses -9007199254740991 (Number.MIN_SAFE_INTEGER)', () => {
   expect(parseIntStrict('-9007199254740991')).toBe(-9007199254740991);
});

test('parses -9007199254740990 (Number.MIN_SAFE_INTEGER + 1)', () => {
   expect(parseIntStrict('-9007199254740990')).toBe(-9007199254740990);
});

test('parses 9007199254740991 (Number.MAX_SAFE_INTEGER)', () => {
   expect(parseIntStrict('9007199254740991')).toBe(9007199254740991);
});

test('parses 9007199254740990 (Number.MAX_SAFE_INTEGER - 1)', () => {
   expect(parseIntStrict('9007199254740990')).toBe(9007199254740990);
});

test('rejects fractional numbers', () => {
   expect(parseIntStrict('0.5')).toBeNaN();
});

test('rejects trailing non-digits', () => {
   expect(parseIntStrict('1a')).toBeNaN();
});

test('rejects trailing non-digits / hex', () => {
   expect(parseIntStrict('0xDF')).toBeNaN();
});

test('rejects scientific notation', () => {
   expect(parseIntStrict('1e2')).toBeNaN();
});

test('rejects leading space', () => {
   expect(parseIntStrict(' 0')).toBeNaN();
});

test('rejects training space', () => {
   expect(parseIntStrict('0 ')).toBeNaN();
});

test('rejects leading plus sign', () => {
   expect(parseIntStrict('+1')).toBeNaN();
});

test('rejects leading zero', () => {
   expect(parseIntStrict('01')).toBeNaN();
});

test('rejects numbers < Number.MIN_SAFE_INTEGER', () => {
   expect(parseIntStrict('-9007199254740992')).toBeNaN();
   expect(parseIntStrict('-9007199254740993')).toBeNaN();
   expect(parseIntStrict('-9007199254740994')).toBeNaN();
});

test('rejects numbers > Number.MAX_SAFE_INTEGER', () => {
   expect(parseIntStrict('9007199254740992')).toBeNaN();
   expect(parseIntStrict('9007199254740993')).toBeNaN();
   expect(parseIntStrict('9007199254740994')).toBeNaN();
});

// This is not a real test case. It just helps me to create the examples table in README.md.
test('compare parseInt(s), parseInt(s, 10), Number(s) and parseIntStrict(s)', () => {
   const pad = (s: string, w: number): string => s + ' '.repeat(Math.max(0, w - s.length));
   const strings = {
      '0.5': 'fractional numbers',
      '1a': 'trailing non-digits',
      '0xDF': 'trailing non-digits / hex',
      '1e2': 'scientific notation',
      '\t \n \r 1': 'leading whitespace',
      '9007199254740993': '> Number.MAX_SAFE_INTEGER',
      '-9007199254740993': '< Number.MIN_SAFE_INTEGER',
   };
   let report = `${pad('', 25)}   ${pad('s', 19)}   ${pad('parseInt(s)', 17)}   ${pad('parseInt(s, 10)', 17)}   ${pad('Number(s)', 17)}   ${pad('parseIntStrict(s)', 17)}\n`;
   for (const [s, description] of Object.entries(strings)) {
      // eslint-disable-next-line radix
      report += `${pad(description, 25)}   ${pad(`${JSON.stringify(s)}`, 19)}   ${pad(`${parseInt(s)}`, 17)}   ${pad(`${parseInt(s, 10)}`, 17)}   ${pad(`${Number(s)}`, 17)}   ${pad(`${parseIntStrict(s)}`, 17)}\n`;
   }
   process.stdout.write('\n' + report + '\n');
});
