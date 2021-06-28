import { ShortenStringPipe } from './shorten-string.pipe';

describe('ShortenStringPipe', () => {
  it('create an instance', () => {
    const pipe = new ShortenStringPipe();
    expect(pipe).toBeTruthy();
  });
});
