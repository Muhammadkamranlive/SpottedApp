import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SignalGroup } from '../../Models/Authentication/UserModel';
import Swal from 'sweetalert2';
import { MessageService } from '../../Services/message.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'] // Corrected typo from styleUrl to styleUrls
})
export class DashBoardComponent implements OnInit, OnChanges {
  screenWidth: number  = 1000;
  screenHeight: number = 1000;
  @Input()loading:boolean=false;
  @Input() user:SignalGroup[]=[];
  message!:SignalGroup;
  @Input() long:number=0
  @Input() lat:number=0;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getScreenWidth();
  }

  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  display: any;
  center : google.maps.LatLngLiteral = { lat:0, lng:0  };
  zoom   = 8;
  markers: { position: google.maps.LatLngLiteral, options: google.maps.MarkerOptions }[] = [];
  infoWindows: google.maps.InfoWindow[] = [];
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    fullscreenControl: false
  };

  constructor(private messageService:MessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['lat'] && changes['lat'].currentValue && changes['long'] &&  changes['long'].currentValue){
      this.center.lat = changes['lat'].currentValue;
      this.center.lng = changes['long'].currentValue;
    }
    if(changes['user'] && changes['user'].currentValue && changes['user'].currentValue.length){
      this.center.lat = changes['user'].currentValue[0].latitude;
      this.center.lng = changes['user'].currentValue[0].longitude;
      this.getScreenWidth();
      this.zoom = 16;
      this.addMarkersFromData(this.user);

    }
    else{
      this.zoom = 16;
    }
  }

  ngOnInit(): void {
    this.getScreenWidth();
    this.addMarkersFromData(this.user);
    this.getCurrentLocation();
  }



  addMarkersFromData(incidents: SignalGroup[]) {
    const offset = 0.00054; // Adjust this value as needed for your marker spacing

    incidents.forEach((incident, index) => {
      const position: google.maps.LatLngLiteral = this.getOffsetPosition(incident.latitude, incident.longitude, index, offset);
      const markerOptions: google.maps.MarkerOptions = {
        position: position,
        animation: google.maps.Animation.DROP,
        label: {
          text: incident.count.toString(),
          color: 'white'
        },
        icon: incident.icon,
        title: incident.type
      };

      const infoWindow = new google.maps.InfoWindow({
        content: `Incident Count: ${incident.count}`,
      });

      this.markers.push({ position, options: markerOptions });
      this.infoWindows.push(infoWindow); // Add infoWindow to the array
    });
  }

  getOffsetPosition(lat: number, lng: number, index: number, offset: number): google.maps.LatLngLiteral {
    const angle = (index / 4) * 2 * Math.PI; // Spread markers in a circle
    const offsetLat = lat + offset * Math.sin(angle);
    const offsetLng = lng + offset * Math.cos(angle);
    return { lat: offsetLat, lng: offsetLng };
  }

  closeAllInfoWindows() {
    this.infoWindows.forEach(infoWindow => {
      infoWindow.close();
    });
  }

  openInfoWindow(marker: { position: google.maps.LatLngLiteral, options: google.maps.MarkerOptions }, index: number) {
    const label = marker.options.label as google.maps.MarkerLabel | undefined;
    const count = label?.text || "10";
    let type  = marker?.options.title?.toString() || ""
    let icon  = marker.options.icon?.toString() || ""

    this.messageService.showInfoCustom(icon,type,count)
 }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) this.display = event.latLng.toJSON();
  }


  getCurrentLocation(): void
  {
    this.loading=true;
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          this.center.lng = position.coords.longitude,
          this.center.lat  = position.coords.latitude

        },
        (error) =>
        {
          this.loading= false;
          this.messageService.showErrorAlert('Location access is required for this application to function properly.')
        },
        {
          enableHighAccuracy: true,
          timeout: 1000000,
          maximumAge: 0
        }
      );
    }
    else
    {
      this.loading= false;
      this.messageService.showErrorAlert('Geolocation is not supported by this device.')
    }
  }


}
