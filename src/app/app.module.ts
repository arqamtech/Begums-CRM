import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { firebaseCred } from './firebaseCred';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginPage } from '../pages/Auth/login/login';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { UsersPage } from '../pages/MainPages/users/users';
import { AddUsersPage } from '../pages/Users/add-users/add-users';
import { EditUsersPage } from '../pages/Users/edit-users/edit-users';
import { LoaderPage } from '../pages/Support/loader/loader';
import { ProfilePage } from '../pages/Profile/profile/profile';
import { EditProfilePage } from '../pages/Profile/edit-profile/edit-profile';
import { AddAdminPage } from '../pages/MainPages/add-admin/add-admin';
import { ChangePassPage } from '../pages/Auth/change-pass/change-pass';
import { UserDetailPage } from '../pages/Users/user-detail/user-detail';
import { AddServicePage } from '../pages/Services/add-service/add-service';
import { ServicesPage } from '../pages/MainPages/services/services';
import { ServicesDetailsPage } from '../pages/Services/services-details/services-details';
import { EditServicePage } from '../pages/Services/edit-service/edit-service';
import { StartSessionPage } from '../pages/Session/start-session/start-session';
import { FeedbackPage } from '../pages/Feedback/feedback/feedback';


firebase.initializeApp(firebaseCred);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    UsersPage,
    AddUsersPage,
    EditUsersPage,
    LoaderPage,
    ProfilePage,
    EditProfilePage,
    AddAdminPage,
    ChangePassPage,
    UserDetailPage,
    AddServicePage,
    ServicesPage,
    ServicesDetailsPage,
    EditServicePage,
    StartSessionPage,
    FeedbackPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    UsersPage,
    AddUsersPage,
    EditUsersPage,
    LoaderPage,
    ProfilePage,
    EditProfilePage,
    AddAdminPage,
    ChangePassPage,
    UserDetailPage,
    AddServicePage,
    ServicesPage,
    ServicesDetailsPage,
    EditServicePage,
    StartSessionPage,
    FeedbackPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
