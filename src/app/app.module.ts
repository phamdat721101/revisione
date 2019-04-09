import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OwlModule } from 'ngx-owl-carousel';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { ExploreComponent } from './explore/explore.component';
import { ReviewComponent } from './review/review.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';
import { OrderComponent } from './order/order.component';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', component:LoginComponent , pathMatch: 'full'},
  { path: 'Dashboard', component:DashboardComponent},
  { path: 'Explore', component:ExploreComponent},
  { path: 'Review', component:ReviewComponent},
  { path: 'User', component:UserComponent},
  { path: 'Post', component: PostComponent},
  { path: 'Order',  component: OrderComponent},
  { path: 'Search', component: ListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavComponent,
    DashboardComponent,
    FooterComponent,
    ExploreComponent,
    ReviewComponent,
    UserComponent,
    PostComponent,
    OrderComponent,
    ListComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    OwlModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
