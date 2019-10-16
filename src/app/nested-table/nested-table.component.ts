import { Component, OnInit,Input } from '@angular/core';
import  paginate  from '../pagination.util';
@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.css']
})
export class NestedTableComponent implements OnInit {
  @Input('dataItems') input_data: any;
  listdataN : any;
  currentPageN = 1;
  pagesN: Array<number>;
  startIndexN: number;
  endIndexN: number;
  pageSizeN : number = 5;
  maxPagesN : number;
  searchTextN : string;
  keyN : string;
  idTextSearchN:string;
  nameTextSearchN:string;
  filteredN : any;
  directionN : string = 'asc';
  filterDataN : any[] = [];

  constructor( ) { }

  ngOnInit() {
    this.listdataN = this.input_data;
    this.filteredN = this.input_data;
	  this.calculateIndexes();
  }
  

    // pagination
    calculateIndexes() {
      const pagination = paginate(
        this.filteredN.length,
        this.currentPageN,
        this.pageSizeN,
        this.maxPagesN
      );
		this.currentPageN = pagination.currentPage;
		this.pagesN = pagination.pages;
		this.startIndexN = pagination.startIndex;
		this.endIndexN = pagination.endIndex;
    }
    setCurrent(e, page) {
      e.preventDefault();
      this.currentPageN = page;
      this.calculateIndexes();
    }
    sort(direction,args){
      let dir =direction;
      if(dir =='dsc'){
        this.swap(true,args);
        this.directionN='asc';
      }
      else {
        this.swap(false,args);
        this.directionN='dsc';
      }
    }
    swap(val,args){
      let sort=false;
      this.filteredN.sort( (a, b) =>{
        // check data is order 
        sort= (val)? (a[args].toString().toLowerCase() > b[args].toString().toLowerCase()):(a[args].toString().toLowerCase() < b[args].toString().toLowerCase());
        if(a[args].toString().toLowerCase() == b[args].toString().toLowerCase()) {
          return 1;
        }
        else if(sort){
            return -1;
          }
        else {
          return 1;
        }
      });
    }
    searchViaCol(e,arg:string){
      this.keyN = arg;
      this.searchTextN = e.target.value;
	}
	onFilterChange(e){
		this.filteredN = this.listdataN.filter((item) => this.isMatch(item,e.target.value));
	}

	isMatch(item,arg ) {
		if (item instanceof Object) {
		  return Object.keys(item).some((k) => this.isMatch(item[k],arg));
		} else {
		  return item.toString().indexOf(arg) > -1
		}
	}
	filterArray(){
		let filters = { id : this.idTextSearchN, name : this.nameTextSearchN};
		this.filteredN = this.listdataN.filter((item) => {
			  if( 
				   ( item['id'] === undefined || ( filters.id == '' ||  filters.id === undefined ) || item['id'].toString ().toLowerCase().includes( filters.id) ) && 

				   ( item['name'] === undefined || ( filters.name == '' ||  filters.name === undefined ) || item['name'].toString().toLowerCase().includes( filters.name) )
					 
			  ){
				return true;
			  }
				return false;
		  });
	}
	
}
