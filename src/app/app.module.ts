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
import { EmployeesPage } from '../pages/MainPages/employees/employees';
import { AddEmployeesPage } from '../pages/Employees/add-employees/add-employees';
import { EditEmployeesPage } from '../pages/Employees/edit-employees/edit-employees';
import { EmployeDetailPage } from '../pages/Employees/employe-detail/employe-detail';
import { UserDetailPage } from '../pages/Users/user-detail/user-detail';


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
    EmployeesPage,
    AddEmployeesPage,
    EditEmployeesPage,
    EmployeDetailPage,
    UserDetailPage,
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
    EmployeesPage,
    AddEmployeesPage,
    EditEmployeesPage,
    EmployeDetailPage,
    UserDetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
