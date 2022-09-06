import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SplitService } from 'src/app/services/split.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settle',
  templateUrl: './settle.component.html',
  styleUrls: ['./settle.component.scss'],
})
export class SettleComponent implements OnInit {
  @Input('splitter') splitter: any;
  @Input('split') split: any;
  @Input('type') type: any;
  amount: number;

  @Output('onClose') close: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('CloseModal') CloseModal: ElementRef;

  constructor(
    private spinner: NgxSpinnerService,
    private splitService: SplitService
  ) {}

  ngOnInit(): void {}

  onSettle() {
    if (this.amount > this.splitter.amount - this.splitter.paidAmount) {
      return Swal.fire({
        title:
          'Amount should not be more than ' +
          (this.splitter.amount - this.splitter.paidAmount),
        icon: 'warning',
      });
    }
    if (this.amount <= this.splitter.amount - this.splitter.paidAmount) {
      this.spinner.show();
      const data = {
        amount: this.amount,
        borrowerId: this.splitter?.userId,
      };
      return (
        this.type == 'payee'
          ? this.splitService.settleAsPayee(this.splitter.id, data)
          : this.splitService.settleAsBorrower(this.splitter.id, data)
      ).subscribe(
        (res) => {
          this.spinner.hide();
          this.onCloseModal();
          Swal.fire({
            title: 'Settlement successfull',
            icon: 'success',
          });
        },
        (err) => {
          this.spinner.hide();
          Swal.fire({
            title: err?.error?.message || 'Something went wrong',
            icon: 'error',
          });
        }
      );
    }
    return;
  }

  onCloseModal() {
    (this.CloseModal as ElementRef).nativeElement?.click();
    this.close.emit({ refresh: true });
  }
}
