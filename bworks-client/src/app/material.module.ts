import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule, MatSelectModule,
  MatSidenavModule, MatSlideToggleModule, MatTableModule,
  MatToolbarModule,
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatCardModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTableModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {
}
