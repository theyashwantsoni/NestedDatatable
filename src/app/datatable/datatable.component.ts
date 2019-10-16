import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import paginate from '../pagination.util';
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  listdata:any;
  currentPage = 1;
  pages: Array<number>;
  startIndex: number;
  endIndex: number;
  pageSize : number = 5;
  maxPages : number;
  searchText : string;
  key : string;
  idTextSearch:string;
  nameTextSearch:string;
  filtered : any;
  direction : string = 'asc';
  filterData : any[] = [];
  constructor( private gs: GeneralService ) {
	//   this.filters = { id : this.idTextSearch, name : this.nameTextSearch};
	//   this.filters = { id : 1, name : 'n'}

   }

  ngOnInit() {
	  this.gs.getData().subscribe(data => {
	  this.listdata = data;
	  this.filtered = data;
      this.calculateIndexes();
	  })
  }
  
  collapse(arg){
	var cell = arg.target;
	var row = cell.parentElement;
	console.log(row.rowIndex )
    var target_row = row.parentElement.children[1];
    if (target_row.style.display == 'table-row') {
      cell.innerHTML = '+';
      target_row.style.display = 'none';
    } else {
      cell.innerHTML = '-';
      target_row.style.display = 'table-row';
    }
  }

    // pagination
    calculateIndexes() {
      const pagination = paginate(
        this.filtered.length,
        this.currentPage,
        this.pageSize,
        this.maxPages
      );
		this.currentPage = pagination.currentPage;
		this.pages = pagination.pages;
		this.startIndex = pagination.startIndex;
		this.endIndex = pagination.endIndex;
    }
    setCurrent(e, page) {
      e.preventDefault();
      this.currentPage = page;
      this.calculateIndexes();
    }
    sort(direction,args){
      let dir =direction;
      if(dir =='dsc'){
        this.swap(true,args);
        this.direction='asc';
      }
      else {
        this.swap(false,args);
        this.direction='dsc';
      }
    }
    swap(val,args){
      let sort=false;
      this.filtered.sort( (a, b) =>{
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
      this.key = arg;
      this.searchText = e.target.value;
	}
	onFilterChange(e){
		this.filtered = this.listdata.filter((item) => this.isMatch(item,e.target.value));
	}

	isMatch(item,arg ) {
		if (item instanceof Object) {
		  return Object.keys(item).some((k) => this.isMatch(item[k],arg));
		} else {
		  return item.toString().indexOf(arg) > -1
		}
	}
	filterArray(){
		let filters = { id : this.idTextSearch, name : this.nameTextSearch};
		this.filtered = this.listdata.filter((item) => {
			  if( 
				   ( item['id'] === undefined || ( filters.id == '' ||  filters.id === undefined ) || item['id'].toString ().toLowerCase().includes( filters.id) ) && 

				   ( item['name'] === undefined || ( filters.name == '' ||  filters.name === undefined ) || item['name'].toString().toLowerCase().includes( filters.name) )
					 
			  ){
				return true;
			  }
				return false;
		  });
		this.calculateIndexes();
	}
	
}
