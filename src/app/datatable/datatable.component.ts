import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
	private listdata:any;
  constructor( private gs: GeneralService ) { }

  ngOnInit() {
	  this.gs.getData().subscribe(data => {
		  console.log(data);
		  this.listdata = data;
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
}
