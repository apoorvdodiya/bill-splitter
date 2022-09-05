import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GroupService } from 'src/app/services/group.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-group',
  templateUrl: './add-edit-group.component.html',
  styleUrls: ['./add-edit-group.component.scss'],
})
export class AddEditGroupComponent implements OnInit {
  groupId = null;
  users: any[] = [];
  selection: any[] = [];
  groupForm: FormGroup;

  constructor(
    private groupService: GroupService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createGroupForm();
    this.getUsersList();
  }

  getUsersList() {
    this.groupService.getUsersList().subscribe(
      (res) => {
        this.users = res.data || [];
      },
      (err) => {
        Swal.fire({
          text: 'Something went wrong!',
          icon: 'error',
        });
      }
    );
  }

  createGroupForm() {
    this.groupForm = this.fb.group({
      name: ['', Validators.required],
      members: [[]],
    });
  }

  onSave() {
    if (this.groupForm.valid && this.selection.length) {
      const data = {
        ...this.groupForm.value,
        members: [...this.selection],
      };

      this.spinner.show();

      this.groupService.createGroup(data).subscribe(
        (res) => {
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            text: 'Group created successfully!',
          });
        },
        (err) => {
          this.spinner.hide();
          Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
          });
        }
      );
    }
  }

  ngSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    return (
      item.firstName.toLocaleLowerCase().indexOf(term) > -1 ||
      item.lastName.toLocaleLowerCase().indexOf(term) > -1
    );
  }
}
