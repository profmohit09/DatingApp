import { Component, input, Input, OnInit, Output, output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  cancelRegister = output<boolean>();
  model: any = {}


constructor(private accountService: AccountService) {}

  ngOnInit(): void {
      
  }

  register()
  {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error=> console.log(error)
    })
  } 

  cancel() {
    this.cancelRegister.emit(false);
  }

}
