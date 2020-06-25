import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { ApiService } from '../services/api.service';
import { Config } from '../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  user= new User();
  url= new Config();

  login(){
    if(this.user.password && this.user.username){
      this.apiService.post(this.url.api + "/login", this.user)
      .subscribe(
        data=>{
          if(data){
            localStorage.setItem('userLoginData', data);
            this.router.navigate(['/blogs'])
          }else{
            alert("Wrong Credentials")
          }
      });
    }else 
      alert("Please enter username and password")
  }

}
