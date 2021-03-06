import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SearchInput, SearchInputType } from '../../model/search-input';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Output() searchDefined = new EventEmitter<SearchInput>();
  @ViewChild('csvReader') csvReader: any;

  selectedFile: any = null;
  textAreaContent = '';

  constructor() { }

  ngOnInit() {
  }

  fileSelected(e) {
    const input = e.target;
    if (input.files) {
      const file = input.files[0];
      this.selectedFile = file;
    }
  }

  /**
   * Controls what happens when the Search button is clicked: Check if the search is by file or text,
   * which the input is and emmit the information.
   */
  public search() {
    let searchInput: SearchInput = new SearchInput();
    if (this.selectedFile) {
      searchInput = { type: SearchInputType.File, value: this.selectedFile };
    } else {
      searchInput = { type: SearchInputType.Text, value: this.textAreaContent };
    }
    this.searchDefined.emit(searchInput);
  }

  checkIfValidStatus() {
    return this.textAreaContent !== '' || this.selectedFile;
  }

  onInputTextChanged(event) {
    this.clearAnySelectedFile();
  }

  clearAnySelectedFile() {
    this.csvReader.nativeElement.value = '';
    this.selectedFile = null;
  }
}
