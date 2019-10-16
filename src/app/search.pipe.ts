import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string, key:any): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it[key].toString().toLowerCase().includes(searchText);
    });
   }
}