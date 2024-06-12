import { Component, Input, OnInit, Output, booleanAttribute, } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit { 
  model: any = {}


constructor(private accountService: AccountService) {}

  ngOnInit(): void {
      
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error=> console.log(error)
    })
  } 

  cancel() {
    console.log(this.cancel);
  }

}
