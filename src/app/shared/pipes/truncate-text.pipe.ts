import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (typeof value === 'undefined') return value;
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }

}
