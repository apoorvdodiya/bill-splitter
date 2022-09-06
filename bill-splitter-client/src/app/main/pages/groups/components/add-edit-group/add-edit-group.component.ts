import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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

  @Output('onClose') close: EventEmitter<any> =  new EventEmitter<any>();
  @ViewChild('CloseModal') CloseModal: ElementRef;

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
          title: 'Something went wrong!',
          icon: 'error',
        });
      }
    );
  }
  
  onCloseModal() {
    (this.CloseModal as ElementRef).nativeElement?.click();
    this.close.emit({ refresh: true });
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
          this.onCloseModal();
          Swal.fire({
            icon: 'success',
            title: 'Group created successfully!',
          });
        },
        (err) => {
          this.spinner.hide();
          Swal.fire({
            title: 'Something went wrong',
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
