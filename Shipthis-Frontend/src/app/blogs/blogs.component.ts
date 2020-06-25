import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { Blog } from '../classes/blog';
import { ApiService } from '../services/api.service';
import { Config } from '../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor( private modalService: NgbModal, private apiService: ApiService, private router: Router) { }

  blogs: any;

  url= new Config();   // URL
  blog= new Blog();
  user: any;

  ngOnInit(): void {
    if(!localStorage.getItem('userLoginData'))
      this.router.navigate(['/login'])

    this.user= JSON.parse(localStorage.getItem('userLoginData'));
    console.log(this.user)
    this.apiService.get(this.url.api + "/get-blog?userId="+ this.user.userId)
    .subscribe(
      data=>{
        this.blogs= data;
    });
  }

  logout(){
    localStorage.removeItem('userLoginData');
    location.reload(false)
  }
  
  // Modal Box Functons --------- add new blog
  closeResult: string;
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addBlog(){
    this.blog.date= new Date();
    this.blog.userId= "abcd";
    this.apiService.post(this.url.api + "/add-blog", this.blog)
    .subscribe(
      data=>{
        if(data){
          alert("Blog Added")
          location.reload(true)
        }else{
          alert("Error Adding Blog")
        }
    });
  }

  updateBlog(blog: any){
    console.log(blog)
    this.apiService.put(this.url.api + "/update-blog", blog)
    .subscribe(
      data=>{
        if(data){
          alert("Blog Updated")
          location.reload (true)
        }else{
          alert("Error Updating Blog")
        }
    });
  }

  deleteBlog(_id: string){
    this.apiService.delete(this.url.api + "/delete-blog?_id=" + _id)
    .subscribe(
      data=>{
        if(data){
          alert("Blog Deleted")
          location.reload(true)
        }else{
          alert("Error Deleting Blog")
        }
    });
  }

}
