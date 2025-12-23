import { Component, inject, type OnInit } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { gallery, type ImageType } from './data'
import { CommonModule } from '@angular/common'
import { Lightbox, LightboxModule } from 'ngx-lightbox'

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [PageTitleComponent, CommonModule, LightboxModule],
  templateUrl: './gallery.component.html',
  styles: ``,
})
export class GalleryComponent implements OnInit {
  breadCrumbItems = [
    { label: 'Extras', path: '/pages/gallery' },
    { label: 'Gallery', path: '/pages/gallery', active: true },
  ]
  category = 'all'
  galleryList = gallery

  private _lightbox = inject(Lightbox)
  private _album: ImageType[] = []

  ngOnInit(): void {
    gallery.forEach((item) => {
      this._album.push(item.image)
    })
  }

  categoryFilter(category: string) {
    this.category = category
    if (category != 'all') {
      this.galleryList = gallery.filter((item) =>
        item.category?.includes(category)
      )
    } else {
      this.galleryList = gallery
    }
  }

  open(index: number): void {
    this._lightbox.open(this._album, index, {
      showImageNumberLabel: true,
      centerVertically: true,
    })
  }
}
