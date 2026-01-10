import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LucideAngularModule, Headphones, Watch, Monitor, Smartphone, MessageCircle, HelpCircle, Target, Eye, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LucideAngularModule.pick({ Headphones, Watch, Monitor, Smartphone, MessageCircle, HelpCircle, Target, Eye, Mail, Phone, MapPin, Facebook, Instagram, Twitter })
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
