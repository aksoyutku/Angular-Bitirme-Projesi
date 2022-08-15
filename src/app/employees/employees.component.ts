import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  NgModel,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  isListView: boolean = false;
  innerScreenWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.innerScreenWidth = window.innerWidth;
    if (this.innerScreenWidth < 768) this.isListView = false;
    else if (this.innerScreenWidth >= 768) {
      if (localStorage.getItem('isListView')) this.isListView = true;
    }
  }

  textInput: string = '';
  employees: any = [];
  filteredEmployees: any = [];

  changeView(boolean: boolean) {
    this.isListView = boolean;
    localStorage.setItem('isListView', JSON.stringify(this.isListView));
  }

  searchQuery(event: any) {
    this.employees = this.filteredEmployees.filter(
      (i: { lastName: string; firstName: string }) =>
        `${i.firstName} ${i.lastName}`
          .toLowerCase()
          .includes(this.textInput.toLowerCase())
    );
    // console.log(this.textInput);
  }

  openCreateModal() {
    const modalRef = this.modalService.open(CreateEmployeeModal);
  }

  openDetailsModal(employee: object) {
    const modalRef = this.modalService.open(DetailsEmployeeModal);
    modalRef.componentInstance.employee = employee;
  }

  openEditModal(employee: object) {
    const modalRef = this.modalService.open(EditEmployeeModal);
    modalRef.componentInstance.employee = employee;
  }

  openDeleteModal(employee: object) {
    const modalRef = this.modalService.open(DeleteEmployeeModal);
    modalRef.componentInstance.employee = employee;
  }

  async getEmployees() {
    const res = await fetch('http://localhost:3030/api/employees');
    const data: [] = await res.json();
    this.filteredEmployees = this.employees = data.reverse();
    // console.log(this.employees);
  }

  async ngOnInit(): Promise<void> {
    await this.getEmployees();

    const isListView = localStorage.getItem('isListView');
    if (isListView) this.isListView = JSON.parse(isListView);
  }
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './employees.modal.details.component.html',
})
export class DetailsEmployeeModal {
  @Input() employee: any;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './employees.modal.create.component.html',
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class CreateEmployeeModal {
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input()
  createEmployeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    title: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    birthDate: new FormControl(''),
    imageName: new FormControl(''),
  });

  // "id": 1,
  // "firstName": "Nancy",
  // "lastName": "Davolio",
  // "title": "Sales Representative",
  // "country": "USA",
  // "city": "Seattle",
  // "birthDate": "1948-12-08",
  // "imageName": "1.jpg"

  async createEmployee(employeeForm: any) {
    const res = await fetch(`http://localhost:3030/api/employees`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(employeeForm.value),
    });

    if (res.ok) {
      this.activeModal.close();
      this.toastr.success('Ürün eklendi');

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([], { relativeTo: this.route });
    } else this.toastr.error('Ürün eklenemedi', 'Bir şeyler ters gitti!');
    console.log(res);
    console.log(employeeForm);
    console.log(JSON.stringify(employeeForm.value));
  }
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './employees.modal.edit.component.html',
})
export class EditEmployeeModal {
  employee: any;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input()
  editEmployeeForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    imageName: new FormControl(''),
  });

  async editEmployee(employeeForm: any) {
    const res = await fetch(
      `http://localhost:3030/api/employees/${this.employee.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.editEmployeeForm.value),
      }
    );

    if (res.ok) {
      this.activeModal.close();
      this.toastr.success('Ürün düzenlendi');

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([], { relativeTo: this.route });
    } else this.toastr.error('Ürün düzenlenemedi', 'Bir şeyler ters gitti!');
    console.log(res, employeeForm);
  }
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './employees.modal.delete.component.html',
})
export class DeleteEmployeeModal {
  @Input() employee: any;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async deleteEmployee(employee: any) {
    const res = await fetch(
      `http://localhost:3030/api/employees/${employee.id}`,
      { method: 'DELETE' }
    );

    if (res.ok) {
      this.activeModal.close();
      this.toastr.success('Ürün silindi');

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([], { relativeTo: this.route });
    } else this.toastr.error('Ürün silinemedi', 'Bir şeyler ters gitti!');

    console.log(employee);
  }
}
