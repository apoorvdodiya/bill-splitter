import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.scss'],
})
export class SplitComponent implements OnInit {
  constructor() {}
  @ViewChild('splitModalRef') splitModalRef: ElementRef;
  splitModal: Modal | null = null;

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
  }

  onAdd() {
    this.splitModal = new Modal(this.splitModalRef?.nativeElement, {});
    this.splitModal.show();
  }
}
