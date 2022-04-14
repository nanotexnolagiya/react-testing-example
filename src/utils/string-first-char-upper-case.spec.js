import { stringFirstCharUpperCase } from "./string-first-char-upper-case";

it('String should be formatted first letter upper case', () => {
  expect(stringFirstCharUpperCase('hello')).toBe('Hello');
  expect(stringFirstCharUpperCase('hello world')).toBe('Hello world');
})