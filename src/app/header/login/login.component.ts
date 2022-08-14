import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends AppComponent {
  async logIn(form: any) {
    try {
      const body = JSON.stringify(form.value);
      const res = await fetch(environment.loginRoute, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      const data = await res.json();
      if (res.ok) {
        this.toastrSuccess('Giriş Başarılı!', 'Yönlendiriliyorsunuz...');
        console.log(res, data);
        localStorage.setItem('token', data);
        setTimeout((): void => {
          location.replace('/');
        }, 3000);
      } else {
        this.toastrWarning('Giriş yapılamadı', 'Lütfen tekrar deneyiniz...');
        console.log(res, data);
      }
    } catch (err: any) {
      this.toastrError('Bir şeyler ters gitti!', err.message);
      console.log(`Hata 💥`);
      console.log({ err });
    }
  }
}
