import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { AddEditGroupComponent } from './components/add-edit-group/add-edit-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  constructor() {}
  @ViewChild('groupModalRef') groupModalRef: ElementRef;
  groupModal: Modal | null = null;

  group = {
    _id: '',
    name: 'Group ',
    members: [
      {
        name: 'Sunil Chauhan',
      },
    ],
  };
  groups: any[] = [];
  ngOnInit(): void {
    // this.groups = Array(15)
    for (const g of Array(15)) {
      this.groups.push({ ...this.group })
    }
  }

  onAdd() {
    this.groupModal = new Modal(this.groupModalRef?.nativeElement, {})
    
    this.groupModal.show();
  }
}
