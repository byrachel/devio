import { Component, OnInit, OnDestroy } from '@angular/core';
import { Blog } from '../../models/Blog.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})

export class CategorylistComponent implements OnInit, OnDestroy {
  posts: Blog[];
  postsSubscription: Subscription;
  constructor(private route: ActivatedRoute, private postsService: PostsService, private router: Router) {}
  ngOnInit() {
    this.postsSubscription = this.postsService.postSubject.subscribe(
      (posts:Blog[]) => {
        this.posts = posts;
    });
    const category = this.route.snapshot.params['category'];
    this.postsService.getPostsByCategory(category);
    this.postsService.emitPosts();
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}





