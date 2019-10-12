import { Component, OnInit } from '@angular/core';
import { AdminInterface } from '../interface/admin.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  adminData: any = new AdminInterface();
  result: any;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {

    $(document).ready(function () {
      $("#adminLogin").click(function (e) {
        e.preventDefault();
      })
    })
  }


  onLogin() {
    

      this.adminData = {
        email: $("#adminEmail").val(),
        password: $("#adminPassword").val()
      };


      $.ajax({
        url: "http://fundoonotes.incubation.bridgelabz.com/api/user/adminLogin",
        data: this.adminData,
        type: 'POST',
        dataType: "json",
        success: function (response) {
          console.log(response);
          localStorage.setItem('id', response.id);
          this.auth.sendToken(response.id);
          //window.location.href = "http://localhost:4200/admin-dashboard";
           this.router.navigate(['/admin-dashboard']);
        }

      });
 
  }
}
