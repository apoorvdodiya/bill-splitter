import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { GroupService } from 'src/app/services/group.service';
import { AddEditGroupComponent } from './components/add-edit-group/add-edit-group.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  constructor(
    private groupService: GroupService,
    private spinner: NgxSpinnerService
  ) {}

  @ViewChild('groupModalRef') groupModalRef: ElementRef;
  groupModal: Modal | null = null;
  expanded = -1;

  groups: any[] = [];
  backUp: any[] = [];

  ngOnInit(): void {
    this.getUserGroups();
  }

  getUserGroups() {
    this.spinner.show();
    this.groupService.getUserGroups().subscribe(
      (res) => {
        this.spinner.hide();
        this.backUp = res.data || [];
        this.groups = res.data || [];
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  onAdd() {
    this.groupModal = new Modal(this.groupModalRef?.nativeElement, {});

    this.groupModal.show();
  }

  onExpand(index: number) {
    this.expanded = this.expanded === index ? -1 : index;
  }

  onSearch(search: string) {
    this.groups = this.backUp.filter((g) =>
      (g.name as string).includes(search)
    );
  }
}
