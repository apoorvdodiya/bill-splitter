import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitRoutingModule } from './split-routing.module';
import { SplitComponent } from './split.component';
import { AddEditSplitComponent } from './components/add-edit-split/add-edit-split.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettleComponent } from './components/settle/settle.component';


@NgModule({
  declarations: [
    SplitComponent,
    AddEditSplitComponent,
    SettleComponent
  ],
  imports: [
    CommonModule,
    SplitRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SplitModule { }
