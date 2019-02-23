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
        'Jobs',
        'Look, it\'s a picture of a factory.  But it could also be any picture you want.',
        'jobs',
        'card__image--factory'
      ),
      new Tile(
        'Map',
        'Roads? Where we\'re going, we don\'t need roads.  But this text does need to be long enough.',
        'job-map',
        'card__image--road'
      ),
      new Tile(
        'Assets',
        'Compound interest is the eighth wonder of the world. He who understands it, earns it ... he who doesn\'t ... pays it.',
        'assets',
        'card__image--fence'
      ),
      new Tile(
        'Liabilities',
        'Money is plentiful for those who understand the simple laws which govern it\'s acquisition.',
        'liabilities',
        'card__image--river'
      ),
      new Tile(
        'Net Worth',
        'Your level of success will seldom exceed your level of personal development, because success is ' +
        'something you attract by the person you become.',
        'net-worth',
        'card__image--record'
      ),
      new Tile(
        'Bank Records',
        'Put each coin to laboring that it may reproduce its kind even as the flocks of the field and help ' +
        'bring to the income, a stream of wealth that shall flow constantly into thy purse.',
        'bank-records',
        'card__image--flowers'
      ),
      new Tile(
        'Nightly Rental Calculations',
        'Fancy real estate quote.',
        'nightly-rentals',
        'card__image--forest'
      ),
    ];
    return tileArray;
  }

  private navTo(route: string): void {
    this.router.navigate(['portal/' + route]);
  }
}
