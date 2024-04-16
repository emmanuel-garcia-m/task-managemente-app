import { Component } from '@angular/core';
import { environment } from '@environments/environment.development';
import { MenuItem } from '@models/menu-item.model';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
    
  opened = false;   
  observableMenu: MenuItem[] = environment.menuOptionsList;

  ngOnInit(): void {
    
  } 

  toggle(): void {
    this.opened = !this.opened;
  }

}
