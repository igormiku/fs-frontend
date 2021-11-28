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

  //this subscribes to Observable to listen for changes in CurrentFeatureToggle
  CurrentFeatureToggleSubscription: Subscription = this.featureToggleService.CurrentFeatureToggleObs.subscribe(
    ft => {
      //-1 is indicating new
      //TODO: to replace it to data object data = {addnew:true, ft: FeatureToggle} in next for Observer
      if (ft.id == -1) {
        this.addNew = true;
        this.featureToggle = this.addFeatureToggle();
      }
      else 
      {      
        this.addNew = false;
        this.featureToggle = ft

        //HTML helper logic
        let unixTime = parseInt(ft.expireson);     
        this.entryExpireOnDate = (new Date(unixTime*1000)).toString(); 
        this.customerIds = this.featureToggle.customerids.join(",")
      }
    });

  //convert input from date to unixtimestamp string for FeatureToggle
  entryExpireOnDateChange() {
    if (this.featureToggle) {
      this.featureToggle.expireson = String((new Date(Date.parse(this.entryExpireOnDate) || NaN)).getTime() / 1000);
    }
  }
  //convert input from customerids string to string array for FeatureToggle
  entryCustomeridsChange() {
    if (this.featureToggle) {
      this.featureToggle.customerids = this.customerIds.split(",");      
    }
  }
  
  constructor(
    private featureToggleService: FeatureToggleService) { }

  ngOnInit(): void { 
  }

  ngOnDestroy(): void {
    this.CurrentFeatureToggleSubscription.unsubscribe();
  }

  //separate logic for add and edit, as using one component for both actions
  addFeatureToggle(): FeatureToggle {
    let date = new Date()
    let expirresondefault = String(date.getTime()/1000);
    this.customerIds="";
    this.entryExpireOnDate = date.toString();
    return {id: 0, customerids: {}, expireson: expirresondefault, } as FeatureToggle
  }

  save(): void{
    if (this.addNew)
    {
      this.entryCustomeridsChange();
      this.featureToggleService.addFeatureToggle(this.featureToggle!) 
       .subscribe(ft => {
        this.featureToggle = ft; 
        this.featureToggleService.notifyAddFeatureToggle(ft);
      } );
    }
    else
    {
      this.featureToggleService.updateFeatureToggle(this.featureToggle!)
        .subscribe(ft => {
            this.featureToggle = ft; 
            this.featureToggleService.notifyUpdateFeatureToggle(ft);
        } );
    }
  }

  delete(): void{
    this.featureToggleService.notifyDeleteFeatureToggle(this.featureToggle!);

    this.featureToggleService.removeFeatureToggle(this.featureToggle!) 
      .subscribe(ft => {
        this.featureToggle = ft; 
      } );
  }
}
