import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(value: any[], propertyName: string, reverse: boolean): any[] {
       if (propertyName && !reverse)
         return value.sort((a: any, b: any) => b[propertyName].localeCompare(a[propertyName]));
       else if (propertyName && reverse) {
        let arr = value.sort((a: any, b: any) => b[propertyName].localeCompare(a[propertyName]));
         return arr.reverse();
       }
       else
         return value;
    }
}
