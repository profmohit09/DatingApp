import { Component, OnInit, output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  cancelRegister = output<boolean>();
  model: any = {}


constructor(private accountService: AccountService, private toaster: ToastrService) {}

  ngOnInit(): void {
      
  }

  register()
  {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error=> this.toaster.error('Please Fill All Data')
    })
  } 

  cancel() {
    this.cancelRegister.emit(false);
  }

}
