import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter', 
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, propName: string, needle: string): any {
    
    if(value.length === 0 || needle === ''){
      return value
    }

    return value.filter(item => item[propName].toLowerCase().includes(needle.toLowerCase()))

  }

}
