import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  records: any;
  countAdvance: any;
  countBasic: any;

  constructor(public auth:AuthService) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers(){

    $(document).ready(function () {
      $.ajax({
        url: "http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList",
        type: 'GET',
        // dataType: "json",
        success: (response) => {
          this.records = response.data.data;
          console.log(this.records);
          var user_data = '';
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
            return u.service == "advance"
          }).length;
          $('#countAdvance').replaceWith(this.countAdvance);
         
          

          this.countBasic = this.records.filter(function (u) {
            return u.service == "basic" || u.service == "Basic"
          }).length;
          $('#countBasic').replaceWith(this.countBasic);

          $("#search").on("keyup", function () {
            var value = $(this).val().toString().toLowerCase();
            $("#searchUser tr").filter(function () {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
              return true;
            });
          });
        },
        error: (error) => {
          console.log(error);
        }
      });
    })
  }

onLogout(){
  this.auth.logout();
}

  onBasic() {
    $(document).ready(function () {
      $.ajax({
        url: "http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList",
        type: 'GET',
        // dataType: "json",
        success: (response) => {
          this.records = response.data.data;
          console.log(this.records);
          this.records = $.grep(this.records, function (n, index) {
            return n["service"] == "basic" || n["service"] == "Basic";
          });
          var user_data = '';
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
      })
    })
  }

  
onAdvance(){
  $(document).ready(function () {
    $.ajax({
      url: "http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList",
      type: 'GET',
      // dataType: "json",
      success: (response) => {
        this.records = response.data.data;
        console.log(this.records);
        this.records = $.grep(this.records, function (n, index) {
          return n["service"] == "advance";
        });
        var user_data = '';
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
    })
  })

}


 

}

