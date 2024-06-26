import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { response } from 'express';
import { error } from 'console';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
 
  model: any ={};
   currentUsers$: Observable<User | null> = of(null); 

    constructor(private accountService: AccountService){

    }

ngOnInit(): void{
  this.currentUsers$ = this.accountService.currentUser$;
}
 


login() {
  this.accountService.login(this.model).subscribe({
    next: response => {
      console.log(response); 
    },
    error: error => console.log(error)
  })
}
logout() {
  this.accountService.logout();  
}

}
