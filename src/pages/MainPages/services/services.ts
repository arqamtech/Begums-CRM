import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { EditServicePage } from '../../Services/edit-service/edit-service';
import { AddServicePage } from '../../Services/add-service/add-service';
import { ServicesDetailsPage } from '../../Services/services-details/services-details';

@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  Services: Array<any> = [];
  ServicesLoaded : Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
  ) {
    this.menuCtrl.enable(true);
    this.getServices();
  }

  getServices() {

    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();


    this.db.list(`Services`).snapshotChanges().subscribe(snap => {
      let tempArray: Array<any> = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.val();
        temp.key = snip.key;
        console.log(temp);

        tempArray.push(temp);
      })
      this.Services = tempArray;
      this.ServicesLoaded = tempArray;
      loading.dismiss();
    })
  }

  initializeItems(): void {
    this.Services = this.ServicesLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.Services = this.Services.filter((v) => {
      if ((v.Name) && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }


  delConfirmServices(u) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Delete Service ?',
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
            this.delServices(u);
          }
        }
      ]
    });
    confirm.present();
  }
  delServices(u) {
    let loading = this.loadingCtrl.create({
      content: 'Deleting Service...'
    });
    loading.present();

    firebase.database().ref("Services").child(u.key).remove().then(() => {
      loading.dismiss();
      this.presentToast(u.Name + " " + "deleted");
    })
  }



  editServices(s) { this.navCtrl.push(EditServicePage, { service: s }); }
  addServices() { this.navCtrl.push(AddServicePage); }
  viewServices(s) { this.navCtrl.push(ServicesDetailsPage, { service: s }); }

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
