import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, MenuItem } from '@models/menu-item.model';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input() menu: Menu = [];

constructor(private router: Router){ }

redirect(selectedServiceLine: MenuItem){ 
  this.router.navigate([selectedServiceLine.link]); 
}
}
