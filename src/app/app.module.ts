import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelResolver } from './hotel/hotel.resolver';
import { UserComponent } from './user/user.component';
import { ListComponent } from './list/list.component';
import { ExploreComponent } from './explore/explore.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/*--Import service--*/
import { AuthService } from './services/auth.service';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: '', component:DashboardComponent},
  { path: 'admin', component:AdminComponent},
  { path: 'hotel/:id', component:HotelComponent, resolve:{data : HotelResolver}},
  { path: 'user', component:UserComponent},
  { path: 'profile', component:ProfileComponent},
  { path: 'search', component: ListComponent},
  { path: 'explore', component: ExploreComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ExploreComponent,
    DashboardComponent,
    HotelComponent,
    AdminComponent,
    UserComponent,
    ListComponent,
    ProfileComponent,
    FooterComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // Database features
    AngularFireAuthModule, // Auth features,
    AngularFireStorageModule, // Storage features
    RouterModule.forRoot(appRoutes, { useHash: false }),
    BrowserModule,
    OwlModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    HotelResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
