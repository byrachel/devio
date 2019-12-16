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

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private router: Router) { }



  ngOnInit() {
    this.postsSubscription = this.postsService.postSubject.subscribe(
      (posts:Blog[]) => {
        this.posts = posts;
    });
    const category = this.route.snapshot.params['category'];
    this.postsService.getPostsByCategory(category);

  }


  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
