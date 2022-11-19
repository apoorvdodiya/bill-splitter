import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitRoutingModule } from './split-routing.module';
import { SplitComponent } from './split.component';
import { AddEditSplitComponent } from './components/add-edit-split/add-edit-split.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SplitComponent,
    AddEditSplitComponent
  ],
  imports: [
    CommonModule,
    SplitRoutingModule,
    NgSelectModule,
    FormsModule
  ]
})
export class SplitModule { }
