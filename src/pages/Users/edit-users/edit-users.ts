import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { UsersPage } from '../../MainPages/users/users';


@IonicPage()
@Component({
  selector: 'page-edit-users',
  templateUrl: 'edit-users.html',
})
export class EditUsersPage {


  userLabel = "Client's";

  user = this.navParams.get("user");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
    console.log(this.user);
    
    this.menuCtrl.enable(true);
  }

  checkData() {
    if (this.user.Name) {
      if (this.user.Email) {
        if (this.user.Phone) {
          if (this.user.Phone.length == 10) {
            this.updateUser();
          } else { this.presentToast("Enter a valid Phonenumber") }
        } else { this.presentToast("Enter" + this.userLabel + "Phone number") }
      } else { this.presentToast("Enter" + this.userLabel + "Email") }
    } else { this.presentToast("Enter" + this.userLabel + "Name") }
  }




  updateUser() {
    let loading = this.loadingCtrl.create({
      content: 'Updating Client...'
    });
    loading.present();

    let ke = this.user.key;
    delete this.user.key;

    firebase.database().ref("Users").child(ke).set(this.user).then(() => {
      this.navCtrl.pop().then(() => {
        this.presentToast(this.userLabel + " " + "Updated")
        loading.dismiss();

      });

    })

  }


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
