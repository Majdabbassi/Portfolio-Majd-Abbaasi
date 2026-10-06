import { Component, input } from '@angular/core';
import { FriendmapToy } from './friendmap-toy';
import { AlbumyToy } from './albumy-toy';
import { MallOsToy } from './mall-os-toy';
import { SwiftdeliverToy } from './swiftdeliver-toy';
import { InsighthubToy } from './insighthub-toy';
import { BookproToy } from './bookpro-toy';
import { CarRentalToy } from './car-rental-toy';
import { SportclubToy } from './sportclub-toy';
import { ReachflowToy } from './reachflow-toy';

/** Picks the interactive toy for a project slug. Add a @case when you add a project. */
@Component({
  selector: 'app-toy-host',
  imports: [FriendmapToy, AlbumyToy, MallOsToy, SwiftdeliverToy, InsighthubToy, BookproToy, CarRentalToy, SportclubToy, ReachflowToy],
  template: `
    @switch (slug()) {
      @case ('friendmap') { <app-friendmap-toy /> }
      @case ('albumy') { <app-albumy-toy /> }
      @case ('mall-os') { <app-mall-os-toy /> }
      @case ('swiftdeliver') { <app-swiftdeliver-toy /> }
      @case ('insighthub') { <app-insighthub-toy /> }
      @case ('bookpro') { <app-bookpro-toy /> }
      @case ('car-rental') { <app-car-rental-toy /> }
      @case ('sportclub') { <app-sportclub-toy /> }
      @case ('reachflow') { <app-reachflow-toy /> }
    }
  `,
})
export class ToyHost {
  slug = input.required<string>();
}
