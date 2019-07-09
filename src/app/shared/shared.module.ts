import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { HistoryComponent } from './components/history/history.component';
import { GoBackComponent } from './components/go-back/go-back.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ConfirmationComponent,
    HistoryComponent,
    GoBackComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    MultiSelectModule,
    NgxPaginationModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    Ng2SmartTableModule,
    MatSortModule,
    MatTableModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    MultiSelectModule,
    NgxPaginationModule,
    ConfirmationComponent,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    HistoryComponent,
    GoBackComponent,
    RouterModule
  ]
})
export class SharedModule { }
