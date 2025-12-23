import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core'
import { PageTitleComponent } from '@component/page-title.component'
import { GoogleMapsModule } from '@angular/google-maps'

type MarkerProperties = {
  position: {
    lat: number
    lng: number
  }
}

@Component({
  selector: 'app-google',
  standalone: true,
  imports: [PageTitleComponent, GoogleMapsModule],
  templateUrl: './google.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoogleComponent {
  breadCrumbItems = [
    { label: 'Maps', path: '/maps/google' },
    { label: 'Google Maps', path: '/maps/google', active: true },
  ]

  longitude = -77.028333
  latitude = -12.043333
  zoom: number = 9

  @Input() pitch: number = 10
  @Input() scrollwheel: boolean = false

  ngOnInit(): void {
    const fenway = { lat: 40.7295174, lng: -73.9986496 }
    const map = new google.maps.Map(document.getElementById('panorama')!, {
      center: fenway,
    })

    const panorama = new google.maps.StreetViewPanorama(
      document.getElementById('panorama')!,
      {
        position: fenway,
        pov: {
          heading: 50,
          pitch: 10,
        },
      }
    )

    map.setStreetView(panorama)
  }

  mapOptions: google.maps.MapOptions = {
    center: { lat: 48.8588548, lng: 2.347035 },
    zoom: 13,
  }

  markers: MarkerProperties[] = [
    { position: { lat: 48.8584, lng: 2.2945 } },
    { position: { lat: 48.8606, lng: 2.3376 } },
    { position: { lat: 48.853, lng: 2.3499 } },
  ]

  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
  }
}
