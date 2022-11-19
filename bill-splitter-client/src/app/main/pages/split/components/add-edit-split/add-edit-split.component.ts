import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-split',
  templateUrl: './add-edit-split.component.html',
  styleUrls: ['./add-edit-split.component.scss']
})
export class AddEditSplitComponent implements OnInit {
  splitId = null;
  constructor() { }
  groups = [];
  ngOnInit(): void {
  }

}
