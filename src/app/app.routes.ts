import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CaferestoComponent } from './pages/caferesto/caferesto';
import { DocumentMarketplaceComponent } from './pages/document-marketplace/document-marketplace';
import { ChellysportComponent } from './pages/chellysport/chellysport';
import { CarRentalComponent } from './pages/car-rental/car-rental';
import { DeliveryTrackingComponent } from './pages/delivery-tracking/delivery-tracking';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects/caferesto', component: CaferestoComponent },
  { path: 'projects/document-marketplace', component: DocumentMarketplaceComponent },
  { path: 'projects/chellysport', component: ChellysportComponent },
  { path: 'projects/car-rental', component: CarRentalComponent },
  { path: 'projects/delivery-tracking', component: DeliveryTrackingComponent },
  { path: '**', redirectTo: '' },
];
