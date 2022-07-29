import {eq, ne} from '../src/operator';
import {Resultt} from '../src';

describe('Operator test', () => {
  it('is equal', () => {
    const r = new Resultt('unittest').filter(eq('unittest'));
    expect(r.isSuccess()).toBeTruthy();
    expect(r.getOrThrow()).toBe('unittest');
  });

  it('should be equal', () => {
    const r = new Resultt('unittest').filter(eq('unit'));
    expect(r.isFailure()).toBeTruthy();
  });

  it('is not equal', () => {
    const r = new Resultt('unittest').filter(ne('unit'));
    expect(r.isSuccess()).toBeTruthy();
    expect(r.getOrThrow()).toBe('unittest');
  });

  it('is deeply equal', () => {
    const r = new Resultt({
      id: '',
      histories: [
        {message: 'a'},
        {message: 'b'},
        {message: 'c'},
      ],
    }).filter(eq({
      id: '',
      histories: [
        {message: 'a'},
        {message: 'b'},
        {message: 'c'},
      ],
    }));
    console.log(r.getOrThrow());
    expect(r.isSuccess()).toBeTruthy();
  });
});
