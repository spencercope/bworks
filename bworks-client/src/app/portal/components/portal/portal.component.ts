import {Component, OnInit} from '@angular/core';
import {Tile} from '../../../../../../shared/models/tile';
import {Router} from '@angular/router';
import { UserVm } from 'src/app/app.api';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  tiles: Tile[];
  user: UserVm;

  constructor(private router: Router, private storageService: LocalStorageService) {
  }

  ngOnInit() {
    this.user = this.storageService.getObject('user');
    this.tiles = this.initTiles();

  } 

  private initTiles(): Tile[] {
    if(this.user.role === 'admin'){
      return [
        new Tile(
          'Create Donation',
          'Start Donation Flow.',
          'donation',
          'card__image--create-donation',
        ),
        new Tile(
          'Inventory',
          'Manager your inventory.',
          'inventory',
          'card__image--inventory',
        ),
        new Tile(
          'Users',
          'Manage your users.',
          'users',
          'card__image--users',
        ),
        new Tile(
          'Donors',
          'Manage your donors.',
          'donors',
          'card__image--donors',
        ),
      ];
    }else if (this.user.role == "staff"){
      return [
        new Tile(
          'Create Donation',
          'Start Donation Flow.',
          'donation',
          'card__image--create-donation',
        ),
        new Tile(
          'Inventory',
          'Manager your inventory.',
          'inventory',
          'card__image--inventory',
        ),
      ];
    }else{
      return [
        new Tile(
          'Create Donation',
          'Start Donation Flow.',
          'donation',
          'card__image--create-donation',
        ),
      ]
    }
    
  }

  private navTo(route: string): void {
    this.router.navigate(['portal', route]);
  }
}
