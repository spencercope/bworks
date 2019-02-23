import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../shared-client/material/material.module';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, LoginRoutingModule, MaterialModule, FormsModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [AuthService],
})
export class LoginModule {}
