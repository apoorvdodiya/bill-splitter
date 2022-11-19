import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { AddEditGroupComponent } from './components/add-edit-group/add-edit-group.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [GroupsComponent, AddEditGroupComponent],
  imports: [CommonModule, GroupsRoutingModule, FormsModule, NgSelectModule],
})
export class GroupsModule {}
