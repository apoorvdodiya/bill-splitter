import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SplitService } from 'src/app/services/split.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.scss'],
})
export class SplitComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private splitService: SplitService
  ) {}
  tab: string = 'paid';
  selectedSplit: any = null;
  selectedSplitter: any = null;
  settleType: any = null;

  @ViewChild('splitModalRef') splitModalRef: ElementRef;
  splitModal: Modal | null = null;

  @ViewChild('settleModalRef') settleModalRef: ElementRef;
  settleModal: Modal | null = null;

  splits: any[] = [];

  ngOnInit(): void {
    this.setPane('paid');
  }

  setPane(tab: string) {
    this.tab = tab;
    this.getAllCut();
  }

  getAllCut() {
    this.spinner.show();
    this.splitService.getUserSplitsByType(this.tab).subscribe(
      (res) => {
        this.spinner.hide();
        this.splits = res.data;
        console.log(res);
      },
      (err) => {
        this.spinner.hide();
        Swal.fire({
          text: 'Something went wrong!',
        });
      }
    );
  }

  onAdd() {
    this.splitModal = new Modal(this.splitModalRef?.nativeElement, {});
    this.splitModal.show();
  }

  onSettle(id: number, split: any, splitter: any, type: any) {
    this.selectedSplit = split;
    this.selectedSplitter = splitter;
    this.settleType = type;

    this.settleModal = new Modal(this.settleModalRef?.nativeElement);
    this.settleModal.show();
  }
}
