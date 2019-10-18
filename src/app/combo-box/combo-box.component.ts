import { Component, OnInit, Input } from "@angular/core";
import { Output, EventEmitter } from '@angular/core'; 

@Component({
  selector: "app-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.css"]
})
export class ComboBoxComponent implements OnInit {
  @Input() list: any;
  @Output() filterTerm = new EventEmitter<any>();

  // two way binding for input text
  inputItem = "";
  // enable or disable visiblility of dropdown
  listHidden = true;
  showError = false;
  selectedIndex = -1;

  // the list to be shown after filtering
  filteredList: any[] = [];

  constructor() {}

  ngOnInit() {
    this.filteredList = this.list;
  }

  // modifies the filtered list as per input
  getFilteredList() {
    this.listHidden = false;
    // this.selectedIndex = 0;
    if (!this.listHidden && this.inputItem !== undefined) {
      this.filteredList = this.list.filter(item =>
        item.name.toLowerCase().startsWith(this.inputItem.toLowerCase())
      );
    }
  }

  // select highlighted item when enter is pressed or any item that is clicked
  selectItem(ind) {
    this.inputItem = this.filteredList[ind].name;
    this.filterTerm.emit(this.inputItem)
    this.listHidden = true;
    this.selectedIndex = ind;
  }

  // navigate through the list of items
  onKeyPress(event) {
    if (!this.listHidden) {
      if (event.key === "Escape") {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      }

      if (event.key === "Enter") {
        this.toggleListDisplay(0);
      }
      if (event.key === "ArrowDown") {
        this.listHidden = false;
        this.selectedIndex =
          (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document
            .getElementsByTagName("list-item")
            [this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === "ArrowUp") {
        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex =
          (this.selectedIndex - 1) % this.filteredList.length;

        if (this.filteredList.length > 0 && !this.listHidden) {
          document
            .getElementsByTagName("list-item")
            [this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {
    if (sender === 1) {
      // this.selectedIndex = -1;
      this.listHidden = false;
      this.getFilteredList();
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        this.selectItem(this.selectedIndex);
        this.listHidden = true;
        if (!this.list.includes(this.inputItem)) {
          this.showError = true;
          this.filteredList = this.list;
        } else {
          this.showError = false;
        }
      }, 500);
    }
  }
}
