import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import paginate from '../pagination.util';
import { ApiService } from '../middleware/api.service';
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})



export class DatatableComponent implements OnInit {
  itemList = ['carrot', 'banana', 'apple', 'potato', 'tomato', 'cabbage', 'turnip', 'okra', 'onion', 'cherries', 'plum', 'mango'];

  listdata:any;
  listdatanested:any;
  currentPage = 1;
  pages: Array<number>;
  startIndex: number;
  endIndex: number;
  pageSize : number = 10;
  maxPages : number;
  searchText : string;
  key : string;
  idTextSearch:string;
  nameTextSearch:string;
  originTextSearch : string;
  contactTextSearch : string;
  teamTextSearch : string;
  dobTextSearch : string;
  filtered : any;
  direction : string = 'asc';
  filterData : any[] = [];
  lower:number;
  upper:number;


  
  constructor( private gs: GeneralService, private as : ApiService ) {
    this.lower = 0;
    this.upper = 100;
  }

  ngOnInit() {

	  // this.gs.getData().subscribe(data => {
	  // this.listdata = data;
	  // this.filtered = data;
    //   this.calculateIndexes();
    // })


    let payload = { 'lower':this.lower,'upper':this.upper};

    this.as.anyservice(payload,'getdata').subscribe(data =>{
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
      if(this.currentPage >= (this.upper/this.pageSize)){
        this.upper = this.currentPage * this.pageSize;
        this.as.anyservice({'lower':this.upper,'upper':this.upper+ this.currentPage * this.pageSize},'getdata').subscribe(data =>{
          this.listdata = [...this.listdata,...data];
          this.filtered = [...this.listdata,...data];
          this.calculateIndexes();
        })
      }else{
        this.calculateIndexes();
      }
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
		let filters = { id : this.idTextSearch, name : this.nameTextSearch, origin: this.originTextSearch, contact:this.contactTextSearch, team: this.teamTextSearch,dob:this.dobTextSearch };
		this.filtered = this.listdata.filter((item) => {
			  if( 
				   ( item['id']   === undefined || ( filters.id   == '' ||  filters.id   === undefined ) || item['id'].toString ().toLowerCase().includes( filters.id)  ) && 

           ( item['name'] === undefined || ( filters.name == '' ||  filters.name === undefined ) || item['name'].toString().toLowerCase().includes( filters.name) ) &&
           ( item['origin']   === undefined || ( filters.origin   == '' ||  filters.origin   === undefined ) || item['origin'].toString ().toLowerCase().includes( filters.origin)  ) && 

           ( item['contact'] === undefined || ( filters.contact == '' ||  filters.contact === undefined ) || item['contact'].toString().toLowerCase().includes( filters.contact) ) &&
           ( item['team']   === undefined || ( filters.team   == '' ||  filters.team   === undefined ) || item['team'].toString ().toLowerCase().includes( filters.team)  ) && 

				   ( item['dob'] === undefined || ( filters.dob == '' ||  filters.dob === undefined ) || item['dob'].toString().toLowerCase().includes( filters.dob) )
					 
			  ){
				return true;
			  }
				return false;
		  });
		this.calculateIndexes();
	}
	
}
