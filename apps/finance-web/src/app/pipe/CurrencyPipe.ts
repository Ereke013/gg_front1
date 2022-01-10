import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'customCurrency'})
export class CurrencyPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    if (!value && !args?.length) {
      return '';
    }
    const num = (value||args[0]);
    if (num.trim().substr(num.length-1) === '₸') {
      return num;
    }

    return num + ' ₸';
  }

}
