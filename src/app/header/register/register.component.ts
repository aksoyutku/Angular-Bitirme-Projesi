import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent extends AppComponent {
  async createAccount(form: any) {
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
      console.log('Kayıt Başarılı! 💪🏻');
      console.log(res, data);
      localStorage.setItem('token', data);
      location.replace('/');
    } else {
      console.log(`Hata 💥`);
      console.log(res, data);
    }
  }
}
