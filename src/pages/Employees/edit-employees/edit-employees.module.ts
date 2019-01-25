import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEmployeesPage } from './edit-employees';

@NgModule({
  declarations: [
    EditEmployeesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEmployeesPage),
  ],
})
export class EditEmployeesPageModule {}
