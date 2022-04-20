import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { CustomerSupportService } from 'src/app/shared/services/customer-support.service';
import { AppState } from 'src/app/store';
import {
  sendingCustomerSupportMessage,
  clearForm,
} from 'src/app/store/actions/customer-support.actions';
import * as fromSelectors from 'src/app/store/selectors/customer-support.selectors';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss'],
})
export class CustomerSupportComponent implements OnInit {
  vm$: Observable<fromSelectors.CustomerSupportViewModel>;

  constructor(
    private customerSupportService: CustomerSupportService,
    private store: Store<AppState>
  ) {}

  isSendSuccess: boolean | null = null;

  ngOnInit(): void {
    this.vm$ = this.store.pipe(
      select(fromSelectors.selectCustomerSupportModel)
    );
  }

  onSubmit(f: NgForm) {
    this.store.dispatch(sendingCustomerSupportMessage({ data: f.value }));
  }

  clearFeedback() {
    this.store.dispatch(clearForm());
  }
}
