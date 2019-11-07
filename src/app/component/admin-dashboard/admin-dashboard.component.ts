import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  records: any;
  countAdvance: any;
  countBasic: any;
  userUrl = environment.userUrl;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  onUnapproved() {
    this.router.navigate(['/unapproved']);
  }

  getAllUsers() {
    this.router.navigate(['admin-dashboard']);
    console.log('dsfff')

    console.log('inisde')
    $.ajax({
      url: this.userUrl + 'getAdminUserList',
      type: 'GET',
      // dataType: "json",
      success: (response) => {
        console.log('innerrrrrrrrrrrr')
        this.records = response.data.data;
        console.log('dscsccccc', this.records);
        let user_data = '';
        user_data += '<tbody id="searchUser">';
        $.each(this.records, function (key, value) {
          user_data += '<tr>';
          user_data += '<td>' + key + '</td>';
          user_data += '<td>' + value.firstName + '</td>';
          user_data += '<td>' + value.lastName + '</td>';
          user_data += '<td>' + value.email + '</td>';
          user_data += '<td>' + value.service + '</td>';
          user_data += '</tr>';
        });
        user_data += '</tbody>';
        $('table tbody').replaceWith(user_data);

        this.countAdvance = this.records.filter(function (u) {
          return u.service == 'advance';
        }).length;
        $('#countAdvance').replaceWith(this.countAdvance);



        this.countBasic = this.records.filter(function (u) {
          return u.service == 'basic' || u.service == 'Basic';
        }).length;
        $('#countBasic').replaceWith(this.countBasic);

        $('#search').on('keyup', function () {
          const value = $(this).val().toString().toLowerCase();
          $('#searchUser tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            return true;
          });
        });
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  onLogout() {
    this.auth.logout();
  }

  onBasic() {
    $.ajax({
      url: this.userUrl + 'getAdminUserList',
      type: 'GET',
      // dataType: "json",
      success: (response) => {
        this.records = response.data.data;
        console.log(this.records);
        this.records = $.grep(this.records, function (n, index) {
          return n['service'] == 'basic' || n['service'] == 'Basic';
        });
        let user_data = '';
        user_data += '<tbody id="searchUser">';
        $.each(this.records, function (key, value) {
          user_data += '<tr>';
          user_data += '<td>' + key + '</td>';
          user_data += '<td>' + value.firstName + '</td>';
          user_data += '<td>' + value.lastName + '</td>';
          user_data += '<td>' + value.email + '</td>';
          user_data += '<td>' + value.service + '</td>';
          user_data += '</tr>';
        });
        user_data += '</tbody>';

        $('table tbody').replaceWith(user_data);
      }
    });

  }


  onAdvance() {
    $.ajax({
      url: this.userUrl + 'getAdminUserList',
      type: 'GET',
      // dataType: "json",
      success: (response) => {
        this.records = response.data.data;
        console.log(this.records);
        this.records = $.grep(this.records, function (n, index) {
          return n['service'] == 'advance';
        });
        let user_data = '';
        user_data += '<tbody id="searchUser">';
        $.each(this.records, function (key, value) {
          user_data += '<tr>';
          user_data += '<td>' + key + '</td>';
          user_data += '<td>' + value.firstName + '</td>';
          user_data += '<td>' + value.lastName + '</td>';
          user_data += '<td>' + value.email + '</td>';
          user_data += '<td>' + value.service + '</td>';
          user_data += '</tr>';
        });
        user_data += '</tbody>';

        $('table tbody').replaceWith(user_data);
      }
    });
  }
}

