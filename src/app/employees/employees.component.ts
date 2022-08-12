import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  constructor() {}
  employees: any = [];

  async getEmployees() {
    const res = await fetch('http://localhost:3030/api/employees');
    const data = await res.json();
    this.employees = [...data];
    console.log(this.employees);
  }

  ngOnInit(): void {
    this.getEmployees();
  }
}
