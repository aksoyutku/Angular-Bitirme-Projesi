import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor() {}

  categories: any = [];

  async getCategories() {
    const res = await fetch('http://localhost:3030/api/categories');
    const data: [] = await res.json();
    this.categories = [...data];
    console.log(this.categories);
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
