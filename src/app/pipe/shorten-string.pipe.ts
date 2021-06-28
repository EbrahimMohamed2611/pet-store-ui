import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenString'
})
export class ShortenStringPipe implements PipeTransform {

  transform(value: string | undefined | null, length = 50): string {
    if (value !== undefined && value !== null) {
      return value.substr(0, length) + '...';
    } else {
      return '';
    }
  }

}
