import { Component, OnInit } from '@angular/core';
import { PhoenixSocket } from '../services/phoenix.socket';

const socketUrl = `ws://localhost:4000/socket`;
const phoenixSocket = new PhoenixSocket(socketUrl);
export const HAS_NEW_WAYPOINTS = 'app/WaypointsPage/HAS_NEW_WAYPOINTS';
const waypointsChannel = phoenixSocket.channel('waypoints', {});

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public waypointStorage: any;
  public waypoint: any;
  constructor() { }

  ngOnInit() {
    this.getWaypoint();
    this.waypoint = localStorage.getItem('waypoint');
    this.waypoint = JSON.parse(this.waypoint);
  }

  getWaypoint(){
    waypointsChannel.join().subscribe((response) => {
     console.log(response);
    });

    const newWaypointEvent$ = waypointsChannel.messages(HAS_NEW_WAYPOINTS);
    newWaypointEvent$.subscribe((response) => {
      console.log(response);
      this.waypointStorage = response;
      localStorage.setItem('waypoint', JSON.stringify(this.waypointStorage));
      //location.reload()
    });
  }
}

