import { ChangeDetectorRef, Component } from '@angular/core';
import { LoadingScreenService } from '@services/loading-screen.service';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  public showLoadinScreen = false; 

  constructor(private loadingScreenService: LoadingScreenService, private sd: ChangeDetectorRef){
  } 

  ngOnInit(): void {
    this.loadingScreenService.loading$
    .subscribe(isLoading =>{
     this.showLoadinScreen = isLoading;
     this.sd.detectChanges();
    });  
  }
}
