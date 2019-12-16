import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Blog } from '../models/Blog.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  posts: Blog[];
  postsSubscription: Subscription;
  isAuth: boolean;

  constructor(private router:Router,
              private postsService:PostsService) { }

  // On initie une connexion au tableau à l'initialisation du component
  ngOnInit() {
    this.postsSubscription = this.postsService.postSubject.subscribe(
      (posts:Blog[]) => {
        this.posts = posts;
      });
    this.postsService.emitPosts();
  }

  onClickPost(id: number) {
    this.router.navigate(['/blog', 'view', id]);
  }

  categoryList(category:string) {
    this.router.navigate(['/blog', category]);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
