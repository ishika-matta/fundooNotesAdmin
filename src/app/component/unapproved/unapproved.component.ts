import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-unapproved',
  templateUrl: './unapproved.component.html',
  styleUrls: ['./unapproved.component.css']
})
export class UnapprovedComponent implements OnInit {
  answers: any;
  baseUrl = environment.baseUrl;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.onUnapprovedAnswers();
  }

  onUnapprovedAnswers() {
      $.ajax({
        url: this.baseUrl+'getUnApprovedAnswer',
        headers:{  Authorization:localStorage.getItem('id') },
        type: 'GET',
        dataType: "json",
        contentType: "application/json",
        success: (response) => {
          console.log('response unapproved answers', response);
          this.answers = response.data;
          console.log('response data answers unapproved',this.answers);
        },
        error: (error) => {
          console.log(error);
        }
      });   
  }

  onApproveAnswer(answerId){
    $.ajax({
      url: this.baseUrl+'approve/'+ answerId, 
      headers:{  Authorization:localStorage.getItem('id') },
      type: 'POST',
      dataType: "json",
      contentType: "application/json",
      success: (response) => {
        console.log('response approve answers', response);
        this.onUnapprovedAnswers(); 
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onRejectAnswer(answerId){
    $.ajax({
      url: this.baseUrl+"reject/"+ answerId, 
      headers:{  Authorization:localStorage.getItem('id') },
      type: 'POST',
      dataType: "json",
      contentType: "application/json",
      success: (response) => {
        console.log('response reject answers', response);
        this.onUnapprovedAnswers(); 
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onLogout() {
    this.auth.logout();
  }

  onAdminHome(){
    this.router.navigate(['admin-dashboard']);
  }
}
