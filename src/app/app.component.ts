import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Northwind';

  loggedIn = false;

  locale = {
    index: '',
    products: '',
    categories: '',
    employees: '',
    contactUs: '',
    logout: '',
    login: '',
    register: '',
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    send: '',
  };

  getLang() {}

  setLang(lang: string) {
    localStorage.setItem('lang', lang);
    location.reload();
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');
    if (!lang) this.setLang('tr');

    if (lang === 'tr') {
      this.locale.index = 'Anasayfa';
      this.locale.products = 'Ürünler';
      this.locale.categories = 'Kategoriler';
      this.locale.employees = 'Çalışanlar';
      this.locale.contactUs = 'Bize Ulaşın';
      this.locale.logout = 'Çıkış';
      this.locale.login = 'Giriş yap';
      this.locale.register = 'Kayıt ol';
      this.locale.firstname = 'İsim';
      this.locale.lastname = 'Soyisim';
      this.locale.username = 'Kullanıcı adı';
      this.locale.password = 'Kullanıcı şifresi';
      this.locale.send = 'Gönder';
    }
    if (lang === 'en') {
      this.locale.index = 'Index';
      this.locale.products = 'Products';
      this.locale.categories = 'Categories';
      this.locale.employees = 'Employees';
      this.locale.contactUs = 'Contact Us';
      this.locale.logout = 'Logout';
      this.locale.login = 'Login';
      this.locale.register = 'Register';
      this.locale.firstname = 'Firstname';
      this.locale.lastname = 'Lastname';
      this.locale.username = 'Username';
      this.locale.password = 'Password';
      this.locale.send = 'Submit';
    }
    if (lang === 'jp') {
      this.locale.index = 'ホーム';
      this.locale.products = '商品';
      this.locale.categories = 'カテゴリー';
      this.locale.employees = '社員';
      this.locale.contactUs = '連絡先';
      this.locale.logout = 'ログアウト';
      this.locale.login = 'ログイン';
      this.locale.register = '登録';
      this.locale.firstname = '名前';
      this.locale.lastname = '苗字';
      this.locale.username = 'ユーザーネーム';
      this.locale.password = 'パスワード';
      this.locale.send = '登録';
    }

    const token = localStorage.getItem('token');
    if (token) this.loggedIn = true;
  }
}
