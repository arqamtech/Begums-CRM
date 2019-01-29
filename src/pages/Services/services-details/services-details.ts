import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-services-details',
  templateUrl: 'services-details.html',
})
export class ServicesDetailsPage {

  service = this.navParams.get("service");


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
