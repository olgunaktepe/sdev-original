import { Component } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sweetalert',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './sweetalert.component.html',
  styles: ``,
})
export class SweetalertComponent {
  breadCrumbItems = [
    { label: 'Extended UI', path: '/extended/sweet-alert' },
    { label: 'Sweet Alerts', path: '/extended/sweet-alert', active: true },
  ]

  basicMessage() {
    Swal.fire({
      text: 'Any fool can use a computer',
      confirmButtonColor: '#3bafda',
    })
  }

  titleText() {
    Swal.fire({
      title: 'The Internet?',
      text: 'That thing is still around?',
      icon: 'question',
      iconColor: '#1ea6d3',
      confirmButtonColor: '#3bafda',
    })
  }

  successmsg() {
    Swal.fire({
      title: 'Good job!',
      text: 'You clicked the button!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3bafda',
      cancelButtonColor: '#f1556c',
      confirmButtonText: 'OK',
    })
  }

  modelTitle() {
    Swal.fire({
      title: 'Oops...',
      text: 'Something went wrong!',
      icon: 'error',
      footer: '<a href="javascript:void(0);">Why do I have this issue?</a>',
      confirmButtonColor: '#3bafda',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          confirmButtonColor: '#3bafda',
          icon: 'success',
        })
      }
    })
  }

  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1abc9c',
      cancelButtonColor: '#f1556c',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          confirmButtonColor: 'r#1abc9c',
          icon: 'success',
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
          confirmButtonColor: 'rgb(3, 142, 220)',
          showCancelButton: true,
        })
      }
    })
  }

  imageHeader() {
    Swal.fire({
      title: 'Minton',
      text: 'Responsive Bootstrap 5 Admin Dashboard',
      imageUrl: 'assets/images/logo-sm-dark.png',
      imageHeight: 50,
      animation: false,
      confirmButtonColor: '#3bafda',
    })
  }
  timer() {
    let timerInterval: any
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      confirmButtonColor: '#3bafda',
      didOpen: () => {
        // Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer()
          if (content) {
            const b: any = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft()
            }
          }
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    })
  }

  custom() {
    Swal.fire({
      title: '<i>HTML</i> <u>example</u>',
      icon: 'info',
      html:
        'You can use <b>Minton text</b>, ' +
        '<a href="//coderthemes.com/">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#1abc9c',
      cancelButtonColor: '#f1556c',
      confirmButtonText: '<i class="mdi mdi-thumb-up-outline"></i> Great!',
      cancelButtonText: '<i class="mdi mdi-thumb-down-outline"></i>',
    })
  }

  customImg() {
    Swal.fire({
      imageUrl: 'https://placeholder.pics/svg/300x1500',
      imageHeight: 1500,
      confirmButtonText: 'OK',
      confirmButtonColor: '#3bafda',
    })
  }

  position() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  customBackground() {
    Swal.fire({
      title: 'Custom width, padding, background.',
      width: 600,
      padding: 100,
      confirmButtonColor: '#3bafda',
      background:
        '#fff url(//www.toptal.com/designers/subtlepatterns/uploads/geometry.png)',
    })
  }

  ajax() {
    Swal.fire({
      title: 'Submit email to run ajax request',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#3bafda',
      cancelButtonColor: '#f1556c',
      preConfirm: (email) => {
        // eslint-disable-next-line no-unused-vars
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (email === 'taken@example.com') {
              Promise.reject(new Error('This email is already taken.'))
            } else {
              resolve()
            }
          }, 2000)
        })
      },

      allowOutsideClick: false,
    }).then((email:any) => {
      Swal.fire({
        icon: 'success',
        title: 'Ajax request finished!',
        confirmButtonColor: '#1abc9c',
        showCancelButton: true,
        html: 'Submitted email: ' + email,
      })
    })
  }
}
