import { Component, OnInit } from '@angular/core';
import { Blog } from '../../models/Blog.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  posts: Blog[] = [];
  postsByCategory: Blog[] = [];
  category: string = '';

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private router: Router) { }

  ngOnInit() {

  let category = this.route.snapshot.params['category'];
  this.postsService.postSubject.subscribe(
    (posts:Blog[]) => {
      posts.map((post) => {
        if(post.category === category) {
        this.postsByCategory.push(post);
        this.category = category;
        // let id = posts.indexOf(post);
        // console.log(id);
      }
    });
  })
  this.postsService.emitPosts();
}

  onBack() {
    this.router.navigate(['/blog']);
  }

}
