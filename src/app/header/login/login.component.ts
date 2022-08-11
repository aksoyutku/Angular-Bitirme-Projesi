import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  async logIn(form: any) {
    const body = JSON.stringify(form.value);
    const res = await fetch(environment.server, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
    const data = await res.json();
    if (res.ok) {
      console.log('Giriş Başarılı! 💪🏻');
      console.log(res, data);
      localStorage.setItem('token', data);
      location.replace('/');
    } else {
      console.log(`Hata 💥`);
      console.log(res, data);
    }
  }
}
