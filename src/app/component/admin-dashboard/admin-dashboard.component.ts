import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  records:any;
   countAdvance:any;
   countBasic:any;
  


  constructor() { }

  ngOnInit() {

    $(document).ready(function () {
      
   

    


      $.ajax({
        url: "http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList",
        type: 'GET',
        // dataType: "json",
        success: function (response) {
          this.records=response.data.data;
          // console.log(this.records);
         var user_data='';
         $.each(this.records,function(key,value){
           user_data += '<tr>';
           user_data +=  '<td>'+ key + '</td>';
           user_data +=  '<td>'+ value.firstName + '</td>';
           user_data +=  '<td>'+ value.lastName + '</td>';
           user_data +=  '<td>'+ value.email + '</td>';
           user_data +=  '<td>'+ value.service + '</td>';
           user_data += '</tr>';
         });

         this.countAdvance=this.records.filter(function (u)
          {
            return u.service=="advance"
          }).length;
         $('#countAdvance').append(this.countAdvance);

         this.countBasic=this.records.filter(function (u)
          {
            return u.service=="basic" || u.service=="Basic"
          }).length;
         $('#countBasic').append(this.countBasic);

         $('#user_table').append(user_data);

        
         
        }, 
        error: function (error){
          console.log(error);
        }
      });

       //searching users in the table

      //  $("#search").on("keyup", function() {
      //   var value:string = $(this).val().toLowerCase();
      //   $("#user_table").filter(function() {
      //     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      //   });
    })
  

}
}
