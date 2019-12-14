import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BlogComponent } from './blog/blog.component';
import { PostFormComponent } from './blog/post-form/post-form.component';

import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CategorylistComponent } from './blog/categorylist/categorylist.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/new', canActivate: [AuthGuardService], component: PostFormComponent },
  { path: 'blog/:category', component: CategorylistComponent },
  { path: '', component: HomeComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    BlogComponent,
    PostFormComponent,
    HomeComponent,
    CategorylistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    PostsService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
