import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor() {}
  products: any = [];

  async getProducts() {
    const res = await fetch('http://localhost:3030/api/products');
    const data: [] = await res.json();
    this.products = [...data];
    console.log(this.products);
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
