import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
import { QuillModule } from 'ngx-quill'
import { ComposeModalComponent } from './compose-modal.component'

@Component({
  selector: 'email-leftbar',
  standalone: true,
  imports: [NgbModalModule, QuillModule, FormsModule],
  template: `
    <div class="inbox-leftbar">
      <div class="d-grid">
        <button
          type="button"
          class="btn btn-danger waves-effect waves-light"
          (click)="openModal()"
        >
          Compose
        </button>
      </div>

      <div class="mail-list mt-4">
        <a href="javascript: void(0);" class="text-danger"
          ><i class="ri-inbox-fill align-bottom me-2"></i>Inbox<span
            class="badge badge-soft-danger float-end ms-2"
            >7</span
          ></a
        >
        <a href="javascript: void(0);"
          ><i class="ri-star-line align-bottom me-2"></i>Starred</a
        >
        <a href="javascript: void(0);"
          ><i class="ri-time-line align-bottom me-2"></i>Snoozed</a
        >
        <a href="javascript: void(0);"
          ><i class="ri-file-list-2-line align-bottom me-2"></i>Draft<span
            class="badge badge-soft-info float-end ms-2"
            >32</span
          ></a
        >
        <a href="javascript: void(0);"
          ><i class="ri-send-plane-2-line align-bottom me-2"></i>Sent Mail</a
        >
        <a href="javascript: void(0);"
          ><i class="ri-delete-bin-line align-bottom me-2"></i>Trash</a
        >
        <a href="javascript: void(0);"
          ><i class="ri-price-tag-3-line align-bottom me-2"></i>Important</a
        >
        <a href="javascript: void(0);"
          ><i class="ri-error-warning-line align-bottom me-2"></i>Spam</a
        >
      </div>

      <h6 class="mt-4">Labels</h6>

      <div class="list-group b-0 mail-list">
        <a href="javascript:void(0);" class="list-group-item border-0"
          ><span class="mdi mdi-circle text-info me-2"></span>Web App</a
        >
        <a href="javascript:void(0);" class="list-group-item border-0"
          ><span class="mdi mdi-circle text-warning me-2"></span>Recharge</a
        >
        <a href="javascript:void(0);" class="list-group-item border-0"
          ><span class="mdi mdi-circle text-dark me-2"></span>Wallet Balance</a
        >
        <a href="javascript:void(0);" class="list-group-item border-0"
          ><span class="mdi mdi-circle text-primary me-2"></span>Friends</a
        >
        <a href="javascript:void(0);" class="list-group-item border-0"
          ><span class="mdi mdi-circle text-success me-2"></span>Family</a
        >
      </div>
    </div>
  `,
  styles: ``,
})
export class LeftbarComponent {
  content = ''

  private modalService = inject(NgbModal)

  openModal() {
    this.modalService.open(ComposeModalComponent, { centered: true })
  }
}
