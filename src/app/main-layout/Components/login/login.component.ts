import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;

  constructor(private fb: FormBuilder, private _Route: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.LoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.LoginForm.valid) {
      const { userName, password } = this.LoginForm.value;

      if (userName === "abdulrehmantutal" && password === "AbdulRehman12!@") {
        localStorage.setItem('token', "Ms1avyqMyFXjt3Y/AMKH/bWVwj5N6GLiBA4DW0lwNv1DuEPyWLH/cIZV7h/DD2K7xZBRo6nZqh+Xjp2KFpkpQE60fSNx9Nt7P96YurIo67tcZ4N8dZSdp2CbEyUgpg70edxnYHAKxGcprRqNzhWZXZw4m+qeZjTs5Z+comBcCrrLJQKtm/Wkd1KhAW2JZlCECMTJ1QwNAOos69CUNKD+gWFfV407x8dgWKieVFebmTDZAWipP89J0gFHf76OnxCN4jhrX4T38jWL4U1EWv2QP4xEBA/FPpsV6MIsvhKbdQmuTwVvzAyGoM4GwDbIYuEADmfwBeENWwJv+kKcgGKwMBlWa0aC5j+kHBzknBIpZC3CS/ITtx1/TGGAen/2dekJ")
        localStorage.setItem('Permission', "Full Admin")
        this._Route.navigate(['/Dashboard']);
      } else if (userName === "raza" && password === "raza123") {
        localStorage.setItem('token', "Ms1avyqMyFXjt3Y/AMKH/bWVwj5N6GLiBA4DW0lwNv1DuEPyWLH/cIZV7h/DD2K7xZBRo6nZqh+Xjp2KFpkpQE60fSNx9Nt7P96YurIo67tcZ4N8dZSdp2CbEyUgpg70edxnYHAKxGcprRqNzhWZXZw4m+qeZjTs5Z+comBcCrrLJQKtm/Wkd1KhAW2JZlCECMTJ1QwNAOos69CUNKD+gWFfV407x8dgWKieVFebmTDZAWipP89J0gFHf76OnxCN4jhrX4T38jWL4U1EWv2QP4xEBA/FPpsV6MIsvhKbdQmuTwVvzAyGoM4GwDbIYuEADmfwBeENWwJv+kKcgGKwMBlWa0aC5j+kHBzknBIpZC3CS/ITtx1/TGGAen/2dekJ")
        localStorage.setItem('Permission', "Admin")
        this._Route.navigate(['/Dashboard']);
      } else {
        alert("Invalid Username or Password");
      }
    } else {
      alert("Please fill in all fields");
    }
  }
}
