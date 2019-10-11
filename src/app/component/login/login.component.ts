import { Component, OnInit } from '@angular/core';
import { AdminInterface } from '../interface/admin.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  adminData: any = new AdminInterface();
  result: any;

  constructor() { }

  ngOnInit() {

    $(document).ready(function () {
      $("#adminLogin").click(function (e) {
        e.preventDefault();
      })
    })
  }


  onLogin() {

    const adminObj = {
      email: $("#adminEmail").val(),
      password: $("#adminPassword").val()
    };


    $.ajax({
      url: "http://fundoonotes.incubation.bridgelabz.com/api/user/adminLogin",
      data: adminObj,
      type: 'POST',
      dataType: "json",
      success: function (response) {
        console.log(response);
      }

    });
  }
}
