import { Component, OnInit, Inject } from '@angular/core';
import { AdminInterface } from '../interface/admin.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  adminData: any = new AdminInterface();
  result: any;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
    $('#adminLogin').click(function (e) {
      e.preventDefault();
    });

  }

  onLogin() {

    this.adminData = {
      email: $('#adminEmail').val(),
      password: $('#adminPassword').val()
    };
    $.ajax({
      url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/adminLogin',
      data: this.adminData,
      type: 'POST',
      dataType: 'json',
      success: (response) => {
        console.log(response);
        this.router.navigate(['admin-dashboard']);
        localStorage.setItem('id', response.id);
        this.auth.sendToken(response.id);
        //window.location.href = "http://localhost:4200/admin-dashboard";

      }, error: (error) => {
        console.log(error);
      }

    });
  }
}
