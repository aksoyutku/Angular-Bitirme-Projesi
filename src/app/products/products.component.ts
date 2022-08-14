import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private modalService: NgbModal) {}
  products: any = [];
  openDetailsModal(product: object) {
    const modalRef = this.modalService.open(detailsModal);
    modalRef.componentInstance.product = product;
  }

  openEditModal(product: object) {
    const modalRef = this.modalService.open(editModal);
    modalRef.componentInstance.product = product;
  }

  openDeleteModal(product: object) {
    const modalRef = this.modalService.open(deleteModal);
    modalRef.componentInstance.product = product;
  }

  async getProducts() {
    const res = await fetch('http://localhost:3030/api/products');
    const data: [] = await res.json();
    this.products = [...data].reverse();
    console.log(this.products);
  }

  ngOnInit(): void {
    this.getProducts();
  }
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Ürün Detayları</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <div class="card shadow-sm" style="height: 280px">
        <!-- style="height: 250px" -->
        <img
          class="img-fluid"
          src="http://localhost:3030/api/products/images/{{
            product.imageName
          }}"
          alt="{{ product.name }}"
          style="height: 140px; object-fit: scale-down"
        />

        <div class="card-body d-flex flex-column">
          <h6 class="card-text">{{ product.name }}</h6>
          <p>Lorem ipsum dolor cart curt</p>
          <div class="d-flex justify-content-between">
            <span><i class="fa-solid fa-hashtag"></i>{{ product.id }}</span>
            <span
              ><i class="fa-solid fa-dollar-sign"></i>{{ product.price }}</span
            >
            <span><i class="fa-solid fa-cubes"></i>{{ product.stock }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-primary"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
    </div>
  `,
})
export class detailsModal {
  @Input() product: any;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">
        <strong>Ürün Düzenleme:</strong> {{ product.name }}
      </h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <!-- Body -->
      <form (ngSubmit)="editProduct(product)">
        <div class="d-flex flex-column gap-1">
          <div class="form-group mb-2">
            <div class="form-floating">
              <input
                ngModel
                name="name"
                value="{{ product.name }}"
                id="productName"
                type="text"
                class="form-control"
                placeholder="a"
              />
              <label for="productName"> Ürün Adı </label>
            </div>
          </div>
          <div class="form-group mb-2">
            <div class="form-floating">
              <input
                ngModel
                name="price"
                value="{{ product.price }}"
                id="productPrice"
                type="text"
                class="form-control"
                placeholder="a"
              />
              <label for="productPrice"> Ürün Fiyatı </label>
            </div>
          </div>
          <div class="form-group mb-2">
            <div class="form-floating">
              <input
                ngModel
                name="stock"
                value="{{ product.stock }}"
                id="productStock"
                type="text"
                class="form-control"
                placeholder="a"
              />
              <label for="productStock"> Stock </label>
            </div>
          </div>
          <div class="form-group mb-2">
            <div class="form-floating">
              <input
                ngModel
                name="imageName"
                value="{{ product.imageName }}"
                id="productImage"
                type="text"
                class="form-control"
                placeholder="a"
              />
              <label for="productImage"> Image URL </label>
            </div>
          </div>
        </div>
        <!-- Body -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-primary"
            (click)="activeModal.close('Close click')"
          >
            Close</button
          ><button
            type="button"
            class="btn btn-warning"
            (click)="editProduct(product)"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  `,
})
export class editModal {
  @Input() product: any;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async editProduct(product: any) {
    console.log(product);
    const body = product;
    const res = await fetch(
      `http://localhost:3030/api/products/${product.id}`,
      { method: 'PUT', body: product }
    );

    if (res.ok) {
      this.activeModal.close();
      this.toastr.success('Ürün düzenlendi');

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([], { relativeTo: this.route });
    } else this.toastr.error('Ürün düzenlenemedi', 'Bir şeyler ters gitti!');

    console.log(product);
  }
}

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Dikkat!</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <div class="modal-body">
      <!-- Body -->
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg
          class="bi flex-shrink-0 me-2"
          width="24"
          height="24"
          role="img"
          aria-label="Danger:"
        >
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>
          <strong>Bir ürün silmek üzeresiniz!</strong>
          <br />
          Silme işlemine devam etmek istiyor musunuz?
        </div>
      </div>
      <!-- Body -->
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-primary"
        (click)="activeModal.close('Close click')"
      >
        Close
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="deleteProduct(product)"
      >
        Sil
      </button>
    </div>
  `,
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
