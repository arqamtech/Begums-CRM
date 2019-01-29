import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesDetailsPage } from './services-details';

@NgModule({
  declarations: [
    ServicesDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesDetailsPage),
  ],
})
export class ServicesDetailsPageModule {}
