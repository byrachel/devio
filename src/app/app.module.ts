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
import { SinglePostComponent } from './blog/single-post/single-post.component';
import { SidebarComponent } from './blog/sidebar/sidebar.component';
import { CategoryComponent } from './blog/category/category.component';
import { SigninComponent } from './auth/signin/signin.component';

const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/new', canActivate: [AuthGuardService], component: PostFormComponent },
  { path: 'blog/view/:id', component: SinglePostComponent },
  { path: 'blog/:category', component: CategoryComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
]


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    BlogComponent,
    PostFormComponent,
    HomeComponent,
    SinglePostComponent,
    SidebarComponent,
    CategoryComponent,
    SigninComponent
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
