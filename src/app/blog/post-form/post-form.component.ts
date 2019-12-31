import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Blog } from '../../models/Blog.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  defaultCategory = 'Formation';

  indexToUpdate;
  posts: Blog[] = [];
  post: Blog;

  constructor(private formBuilder: FormBuilder,
              private router:Router,
              private postsService:PostsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
    this.postsService.postSubject.subscribe(
      (posts:Blog[]) => {
        this.posts = posts;
      });
    this.postsService.getPosts();
    this.postsService.emitPosts();

    const id = this.route.snapshot.params['id'];
    this.indexToUpdate = id;

    this.postsService.getSinglePost(+id).then(
      (post: Blog) => {
        this.post = post;
        this.postForm.get('title').setValue(this.post.title);
        this.postForm.get('content').setValue(this.post.content);
        this.postForm.get('category').setValue(this.post.category);
        this.postForm.get('resum').setValue(this.post.resum);
        this.postForm.get('link').setValue(this.post.link);
      }
    );
  }


  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      resum: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
      link: ['', [Validators.required]]
    });
  }

  onSavePost() {

    // const title = this.postForm.get('title').value;
    // const content = this.postForm.get('content').value;
    // const category = this.postForm.get('category').value;
    // const resum = this.postForm.get('resum').value;
    // const link = this.postForm.get('link').value;
    // const newPost = new Blog(title, content, category, resum, link);

    const newPost: Blog = this.postForm.value;

    if(this.indexToUpdate >= 0) {
      this.postsService.updatePost(this.indexToUpdate, newPost);
    } else {
      this.postsService.createNewPost(newPost);
      this.router.navigate(['/blog']);
    }
  }

    resetForm() {
      this.postForm.reset();
    }
  }
