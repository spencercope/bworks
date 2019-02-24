import {Component, OnInit} from '@angular/core';
import {Tile} from '../../../../../../shared/models/tile';
import {Router} from '@angular/router';

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

  ngOnInit() {
  }

  private initTiles(): Tile[] {
    return [
      new Tile(
        'Create Donation',
        'Start Donation Flow.',
        'donation',
        'card__image--create-donation'
      ),
      new Tile(
        'Inventory',
        'Manager your inventory.',
        'inventory',
        'card__image--inventory'
      ),
      new Tile(
        'Users',
        'Manage your users.',
        'users',
        'card__image--users'
      ),
      new Tile(
        'Donors',
        'Manage your donors.',
        'donors',
        'card__image--donors'
      ),
    ];
  }

  private navTo(route: string): void {
    this.router.navigate(['portal', route]);
  }
}
