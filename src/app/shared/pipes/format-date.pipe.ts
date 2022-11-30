import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

    transform(date: string): string {
        let options = { 
            weekday: 'long', 
            year: 'numeric',
            month: 'long', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        let dateObject = new Date(date);
        return dateObject.toLocaleDateString('es-CO');
    }
}
