import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss'],
})
export class AddEditGroupComponent implements OnInit {
  groupId = null;
  users = [{ name: 'nilesh' }];
  selection = {}
  constructor() {}

  ngOnInit(): void {}
}
