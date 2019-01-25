import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-employe-detail',
  templateUrl: 'employe-detail.html',
})
export class EmployeDetailPage {

  employee = this.navParams.get("employee");

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.employee);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeDetailPage');
  }

}
