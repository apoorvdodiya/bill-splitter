import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { GroupService } from 'src/app/services/group.service';
import { SplitService } from 'src/app/services/split.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-split',
  templateUrl: './add-edit-split.component.html',
  styleUrls: ['./add-edit-split.component.scss'],
})
export class AddEditSplitComponent implements OnInit {
  splitId = null;

  constructor(
    private groupService: GroupService,
    private splitService: SplitService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {}

  groups: any[] = [];
  splitForm: FormGroup;
  selectedGroupMembers: any = null;

  ngOnInit(): void {
    this.createForm();
    this.getUserGroups();
  }

  getUserGroups() {
    this.spinner.show();
    this.groupService.getUserGroups().subscribe(
      (res) => {
        this.spinner.hide();
        this.groups = res.data || [];
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  onSelectGroup() {
    const selectedGroup = this.splitForm.controls['selectedGroup'].value;
    const group = this.groups.find((g) => g.id === +selectedGroup);

    const amount = this.splitForm.controls['totalAmount']?.value;
    (this.splitForm.controls['splitters'] as FormArray) = new FormArray([]);
    for (const member of group?.members) {
      (this.splitForm.controls['splitters'] as FormArray).push(
        this.fb.group({
          amount: [group?.members?.length ? amount / group.members.length : 0],
          ration: [1],
          groupId: [group.id],
          userId: [member.id],
          member,
        })
      );
    }
    this.splitForm.updateValueAndValidity();
  }

  getSpliitersArrayForm() {
    return (this.splitForm.controls['splitters'] as FormArray).value;
  }

  onSaveSplit() {
    console.log(this.splitForm.valid, this.splitForm.value);

    if (this.splitForm.valid) {
      this.spinner.show();
      this.splitService.createSplit(this.splitForm.value).subscribe(
        (res) => {
          this.spinner.hide();
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

  createForm() {
    this.splitForm = this.fb.group({
      selectedGroup: ['null'],
      title: ['', Validators.required],
      type: ['group', Validators.required],
      totalAmount: [0, Validators.required],
      description: [''],
      splitters: [],
    });
  }
}
