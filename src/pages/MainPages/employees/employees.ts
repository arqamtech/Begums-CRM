import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AddUsersPage } from '../../Users/add-users/add-users';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditUsersPage } from '../../Users/edit-users/edit-users';
import * as firebase from 'firebase';
import { EditEmployeesPage } from '../../Employees/edit-employees/edit-employees';
import { AddEmployeesPage } from '../../Employees/add-employees/add-employees';
import { EmployeDetailPage } from '../../Employees/employe-detail/employe-detail';

@IonicPage()
@Component({
  selector: 'page-employees',
  templateUrl: 'employees.html',
})
export class EmployeesPage {


  Employees: Array<any> = [];
  EmployeesLoaded: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
  ) {
    this.menuCtrl.enable(true);
    this.getEmployees();
  }

  getEmployees() {

    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();


    this.db.list(`Employees`).snapshotChanges().subscribe(snap => {
      let tempArray: Array<any> = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.val();
        temp.key = snip.key;
        console.log(temp);

        tempArray.push(temp);
      })
      this.Employees = tempArray;
      this.EmployeesLoaded = tempArray;
      loading.dismiss();
    })
  }

  initializeItems(): void {
    this.Employees = this.EmployeesLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.Employees = this.Employees.filter((v) => {
      if ((v.Name) && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }


  delConfirmEmployee(u) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Delete Employee ?',
      message: 'This data cannot be recovered again.',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this.delEmployee(u);
          }
        }
      ]
    });
    confirm.present();
  }
  delEmployee(u) {
    let loading = this.loadingCtrl.create({
      content: 'Deleting Employee...'
    });
    loading.present();

    firebase.database().ref("Employees").child(u.key).remove().then(() => {
      loading.dismiss();
      this.presentToast(u.Name + " " + "deleted");
    })
  }



  editEmployee(e) { this.navCtrl.push(EditEmployeesPage, { Employee: e }); }
  addEmployee() { this.navCtrl.push(AddEmployeesPage); }
  viewEmployee(u) { this.navCtrl.push(EmployeDetailPage, { employee: u }); }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }
}
