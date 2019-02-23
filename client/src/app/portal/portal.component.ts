import { Component, OnInit } from '@angular/core';
import { Tile } from '../../../../shared/models/tile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  tiles: Tile[];

  constructor(private router: Router) {
    this.tiles = this.initTiles();
  }

  ngOnInit() {}

  private initTiles(): Tile[] {
    let tileArray = [];
    tileArray = [
      new Tile(
        'Create Donation',
        'Start Donation Flow.  However, the styling is bad cause the description has to be this long to work.',
        'donation-flow',
        'card__image--river'
      ),
      new Tile(
        'Inventory',
        'Manager your inventory.   However, the styling is bad cause the description has to be this long to work.',
        'items',
        'card__image--factory'
      ),
      new Tile(
        'Users',
        'Manage your users.  However, the styling is bad cause the description has to be this long to work.',
        'users',
        'card__image--road'
      ),
      new Tile(
        'Donors',
        'Manage your donors.  However, the styling is bad cause the description has to be this long to work.',
        'donors',
        'card__image--fence'
      ),
    ];
    return tileArray;
  }

  private navTo(route: string): void {
    this.router.navigate(['portal/' + route]);
  }
}
