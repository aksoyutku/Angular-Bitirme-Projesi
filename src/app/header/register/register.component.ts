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
    try {
      const body = JSON.stringify(form.value);
      const res = await fetch(environment.registerRoute, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      console.log(res);
      const data = await res.json();
      if (res.ok) {
        this.toastrSuccess('Giriş Başarılı!', 'Yönlendiriliyorsunuz...');
        console.log(res, data);
        localStorage.setItem('token', data);
        setTimeout((): void => {
          location.replace('/');
        }, 3000);
      } else {
        this.toastrWarning(
          'Hesap oluşturulamadı',
          'Lütfen tekrar deneyiniz...',
        );
        console.log(res, data);
      }
    } catch (err: any) {
      this.toastrError('Bir şeyler ters gitti!', err.message);
      console.log(`Hata 💥`);
      console.log(err);
    }
  }
}
