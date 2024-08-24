import { suma } from './math';

describe('Math Functions', () => {
  it('should correctly add two numbers', () => {
    const result = suma(2, 3);
    console.log('Result of sum(2, 3):', result);
    expect(result).toBe(5);
  });
});
