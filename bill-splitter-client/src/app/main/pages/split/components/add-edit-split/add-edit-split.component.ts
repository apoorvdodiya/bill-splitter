import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
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

  @Output('onClose') close: EventEmitter<any> =  new EventEmitter<any>();
  @ViewChild('CloseModal') CloseModal: ElementRef;

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
      }
    );
  }

  onCloseModal() {
    (this.CloseModal as ElementRef).nativeElement?.click();
    this.close.emit({ refresh: true });
  }

  onSelectGroup() {
    const selectedGroup = this.splitForm.controls['selectedGroup'].value;
    const group = this.groups.find((g) => g.id === +selectedGroup);

    const amount = this.splitForm.controls['totalAmount']?.value;
    (this.splitForm.controls['splitters'] as FormArray) = new FormArray([]);
    for (const member of group?.members) {
      (this.splitForm.controls['splitters'] as FormArray).push(
        this.fb.group({
          amount: [group?.members?.length ? (amount / group.members.length).toFixed(2) : 0],
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
    if (this.splitForm.valid) {
      this.spinner.show();
      this.splitService.createSplit(this.splitForm.value).subscribe(
        (res) => {
          Swal.fire({
            text: res?.message || 'Split created successfully',
            icon: 'success',
          });
          this.onCloseModal();
          this.spinner.hide();
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
