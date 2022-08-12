import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor() {}

  token = localStorage.getItem('token');
  categories: any = [];

  async getCategories() {
    const res = await fetch('http://localhost:3030/api/categories', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
        Host: 'api.producthunt.com',
      },
    });
    const data: [] = await res.json();
    this.categories = [...data];
    console.log(this.categories);
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
