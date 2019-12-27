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
  id: number;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService,
              private router: Router) { }

  ngOnInit() {

  let category = this.route.snapshot.params['category'];
  this.postsService.postSubject.subscribe(

    (posts:Blog[]) => {
      
      for(let i=0; i<posts.length; i++) {
      if(posts[i].category == category) {
        this.postsByCategory.push(posts[i]);
        this.category = category;
        this.id = i;
      }
    }

    });
  this.postsService.emitPosts();
  }

  onClickPost(id: number) {
    this.router.navigate(['/blog', 'view', id]);
  }

  onBack() {
    this.router.navigate(['/blog']);
  }

}
