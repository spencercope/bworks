import {Component, Input, forwardRef, Output, EventEmitter} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'cva-date',
  templateUrl: './cva-date.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CvaDateComponent),
      multi: true,
    },
  ],
})
export class CvaDateComponent implements ControlValueAccessor {
  // @Input()
  // model: any;
  @Input() modelDateField: any;
  @Output() modelDateFieldChange = new EventEmitter<any>();
  @Input() _dateValue: any;
  @Input() placeholder = 'Choose Date';

  YYYY_MM_DD_FORMAT = 'YYYY-MM-DD';

  // get dateValue() {
  //   return moment(this.model).format(this.YYYY_MM_DD_FORMAT);
  // }

  set dateValue(val) {
    this._dateValue = moment(val).format(this.YYYY_MM_DD_FORMAT);
    this.propagateChange(this._dateValue);
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.modelDateFieldChange.emit(moment(event.value).format(
      this.YYYY_MM_DD_FORMAT
    ));
    this._dateValue = moment(event.value).format(this.YYYY_MM_DD_FORMAT);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this._dateValue = moment(value).format(this.YYYY_MM_DD_FORMAT);
    }
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
