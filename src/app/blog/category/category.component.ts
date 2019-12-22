import { Component, OnInit, OnDestroy } from '@angular/core';
import { Blog } from '../../models/Blog.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  posts: Blog[];
  postsSubscription: Subscription;
<<<<<<< HEAD:src/app/blog/categorylist/categorylist.component.ts
  constructor(private route: ActivatedRoute, private postsService: PostsService, private router: Router) {
  }
  
=======

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private router: Router) { }



>>>>>>> 5b8d0c364814c32a0f3d65edca63822f36ef5a94:src/app/blog/category/category.component.ts
  ngOnInit() {
    this.postsSubscription = this.postsService.postSubject.subscribe(
      (posts:Blog[]) => {
        this.posts = posts;
<<<<<<< HEAD:src/app/blog/categorylist/categorylist.component.ts
        const category = this.route.snapshot.params['category'];
        this.postsService.getPostsByCategory(category);
        console.log('category ' + category + ' - posts ' + this.posts)

      }
      );

      
=======
    });
    const category = this.route.snapshot.params['category'];
    this.postsService.getPostsByCategory(category);
>>>>>>> 5b8d0c364814c32a0f3d65edca63822f36ef5a94:src/app/blog/category/category.component.ts

  }


  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
