import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  FormGroup,
  FormControl,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
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
  products: any = [];
  filteredProducts: any = [];

  changeView(boolean: boolean) {
    this.isListView = boolean;
    localStorage.setItem('isListView', JSON.stringify(this.isListView));
  }

  searchQuery(event: any) {
    this.products = this.filteredProducts.filter((i: { name: string }) =>
      i.name.toLowerCase().includes(this.textInput.toLowerCase())
    );
    console.log(this.textInput);
  }

  openCreateModal() {
    const modalRef = this.modalService.open(createModal);
  }

  openDetailsModal(product: object) {
    const modalRef = this.modalService.open(detailsModal);
    modalRef.componentInstance.product = product;
  }

  openEditModal(product: object) {
    const modalRef = this.modalService.open(EditModal);
    modalRef.componentInstance.product = product;
  }

  openDeleteModal(product: object) {
    const modalRef = this.modalService.open(deleteModal);
    modalRef.componentInstance.product = product;
  }

  async getProducts() {
    const res = await fetch('http://localhost:3030/api/products');
    const data: [] = await res.json();
    this.filteredProducts = this.products = data.reverse();
    // console.log(this.products);
  }

  async ngOnInit(): Promise<void> {
    await this.getProducts();

    const isListView = localStorage.getItem('isListView');
    if (isListView) this.isListView = JSON.parse(isListView);
  }
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './products.modal.details.component.html',
})
export class detailsModal {
  @Input() product: any;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './products.modal.create.component.html',
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class createModal {
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input()
  createProductForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    imageName: new FormControl(''),
  });

  async createProduct(productForm: any) {
    const res = await fetch(`http://localhost:3030/api/products`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(productForm.value),
    });

    if (res.ok) {
      this.activeModal.close();
      this.toastr.success('Ürün eklendi');

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([], { relativeTo: this.route });
    } else this.toastr.error('Ürün eklenemedi', 'Bir şeyler ters gitti!');
    console.log(res);
    console.log(productForm);
    console.log(JSON.stringify(productForm.value));
  }
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './products.modal.edit.component.html',
})
export class EditModal {
  product: any;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Input()
  editProductForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    imageName: new FormControl(''),
  });

  async editProduct(productForm: any) {
    const res = await fetch(
      `http://localhost:3030/api/products/${this.product.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.editProductForm.value),
      }
    );

    if (res.ok) {
      this.activeModal.close();
      this.toastr.success('Ürün düzenlendi');

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([], { relativeTo: this.route });
    } else this.toastr.error('Ürün düzenlenemedi', 'Bir şeyler ters gitti!');
    console.log(res, productForm);
  }
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './products.modal.delete.component.html',
})
export class deleteModal {
  @Input() product: any;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async deleteProduct(product: any) {
    const res = await fetch(
      `http://localhost:3030/api/products/${product.id}`,
      { method: 'DELETE' }
    );

    if (res.ok) {
      this.activeModal.close();
      this.toastr.success('Ürün silindi');

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([], { relativeTo: this.route });
    } else this.toastr.error('Ürün silinemedi', 'Bir şeyler ters gitti!');

    console.log(product);
  }
}
