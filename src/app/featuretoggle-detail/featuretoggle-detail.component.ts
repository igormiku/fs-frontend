import { Component, OnInit, Input} from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription, of, tap} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { FeatureToggle } from '../featuretoggle';
import { FeatureToggleService } from '../featuretoggle.service';

@Component({
  selector: 'app-featuretoggle-detail',
  templateUrl: './featuretoggle-detail.component.html',
  styleUrls: ['./featuretoggle-detail.component.css']
})
export class FeaturetoggleDetailComponent implements OnInit {
  featureToggle: FeatureToggle | undefined;
  addNew: boolean = false;
 
 
  entryExpireOnDate = '';
  customerIds = '';

  entryExpireOnDateChange() {
    if (this.featureToggle) {
      this.featureToggle.expireson = String((new Date(Date.parse(this.entryExpireOnDate) || NaN)).getTime() / 1000);
    }
  }

  entryCustomeridsChange() {
    if (this.featureToggle) {
      this.featureToggle.customerids = this.customerIds.split(",");      
    }
  }
  
  constructor(
    private featureToggleService: FeatureToggleService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    //subscribe to catch param changes from Observable paramMap
    this.route.paramMap.subscribe(
      params => 
      { 
        //below is to process params either features/id, features/add, or feature/crap
        this.addNew = false
        if (isNaN(Number(params.get('id')!)))
        {
          if (params.get('id') == 'add')
          {
            //change state of compenent to add new entries
            this.addNew = true
            //feature/new case
            this.featureToggle =  this.addFeatureToggle()
          }
          else
          {
            //return nothing is feature/crap
            this.featureToggle = undefined
          }
        }
        else
        {
            //feature/properid case
          this.featureToggle =  this.getFeatureToggle(params.get('id')!)
        }
      }
    )
  }

  //separate logic for add and edit, as using one component for both actions
  addFeatureToggle(): FeatureToggle {
    let date = new Date()
    let expirresondefault = String(date.getTime()/1000);
    this.customerIds="";
    this.entryExpireOnDate = date.toString();
    return {id: 0, customerids: {}, expireson: expirresondefault, } as FeatureToggle
  }

  getFeatureToggle(id: string): FeatureToggle {
    this.featureToggleService.getFeatureToggle(id.toString())
      .subscribe(ft => 
        {
          this.featureToggle = ft;

          let unixTime = parseInt(ft.expireson);     
          this.entryExpireOnDate = (new Date(unixTime*1000)).toString(); 
          this.customerIds = this.featureToggle.customerids.join(",")
          
        }
      );
    return this.featureToggle!;
  }

  save(): void{
    if (this.addNew)
    {
      this.featureToggleService.addFeatureToggle(this.featureToggle!) 
       .subscribe(ft => {
        this.featureToggle = ft; 
        this.featureToggleService.notifyAboutFeatureTogglesChange();
        this.addNew = false;
      } );
    }
    else
    {
      this.featureToggleService.updateFeatureToggle(this.featureToggle!)
        .subscribe(ft => {
            this.featureToggle = ft; 
            this.featureToggleService.notifyAboutFeatureTogglesChange();
        } );

    }
  }

  delete(): void{
    this.featureToggleService.removeFeatureToggle(this.featureToggle!) 
      .subscribe(ft => {
        this.featureToggle = ft; 
        this.featureToggleService.notifyAboutFeatureTogglesChange();
      } );
  }
}
