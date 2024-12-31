import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
 
  model: any ={};
   currentUsers$: Observable<User | null> = of(null); 

    constructor(private accountService: AccountService, private route: ActivatedRoute,
      private router: Router, private toaster: ToastrService){
    }

ngOnInit(): void{
  this.currentUsers$ = this.accountService.currentUser$;
}

login() 
  {
    this.accountService.login(this.model).subscribe({
      next: _ => {
       this.router.navigateByUrl('/members');
      },
      // error: error => console.log(error)
      error: error => this.toaster.error(error.error)
    })
  }

logout() 
  {
    this.accountService.logout();  
    this.router.navigateByUrl('/');
  }

}
