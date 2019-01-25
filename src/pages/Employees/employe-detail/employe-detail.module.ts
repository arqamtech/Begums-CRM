import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeDetailPage } from './employe-detail';

@NgModule({
  declarations: [
    EmployeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeDetailPage),
  ],
})
export class EmployeDetailPageModule {}
