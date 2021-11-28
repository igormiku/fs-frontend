import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, takeWhile } from 'rxjs';

import { FeatureToggle } from '../featuretoggle';
import { FeatureToggleService } from '../featuretoggle.service';

@Component({
  selector: 'app-featuretoggle-list',
  templateUrl: './featuretoggle-list.component.html',
  styleUrls: ['./featuretoggle-list.component.css']
})


export class FeaturetoggleListComponent implements OnInit {
  selectedFeatureToggle?: FeatureToggle;
  featureToggles : FeatureToggle[] = [];
  RouteParamMapSubscription : Subscription = new Subscription();

  CurrentFeatureToggleSubscription: Subscription = this.featureToggleService.CurrentFeatureToggleObs.subscribe(
    ft => {
      this.selectedFeatureToggle = ft
    }
  );

  DeleteFeatureToggleSubscription: Subscription = this.featureToggleService.DeleteFeatureToggleObs.subscribe(
    ft => {
      this.featureToggles = this.featureToggles.filter(item => item.id != ft.id) 
    }
  );

  AddFeatureToggleSubscription: Subscription = this.featureToggleService.AddFeatureToggleObs.subscribe(
    ft => {
      this.featureToggles.push(ft);
      this.selectedFeatureToggle = ft;
    }
  );

  UpdateFeatureToggleSubscription: Subscription = this.featureToggleService.UpdateFeatureToggleObs.subscribe(
    ft => {
      let updateItem =  this.featureToggles.find(item => item.id == ft.id);
      let index = this.featureToggles.indexOf(updateItem!);
      this.featureToggles[index] = ft;
      this.selectedFeatureToggle = ft;
    }
  );


  constructor(private featureToggleService: FeatureToggleService,
    private route: ActivatedRoute,
    private router:Router) { }

  routeParamSubcribe(): void{
    //subscribe to catch param changes from Observable paramMap
    this.RouteParamMapSubscription = this.route.paramMap.subscribe(
      params => 
      { 
        //below is to process params either features/id, features/add, or feature/something
        if (isNaN(Number(params.get('id')!)))
        {
          if (params.get('id') == 'add')
          {
            //same component for add function
            var ft = {id:-1} as FeatureToggle;
            this.featureToggleService.notifyCurrentFeatureToggleChange(ft);
          }
        }
        else
        {
          //notify service about of change of current/selected FeatureToggle
          this.featureToggleService.notifyCurrentFeatureToggleChange(this.getFeatureToggle(params.get('id')!));
        }
      }
    )
  } 

  ngOnInit(): void {
    this.getFeatureToggles();
  }

  getFeatureToggle(id: string): FeatureToggle {
    return this.featureToggles.find(item => item.id.toString() == id)!
  }

  ngOnDestroy() {
    this.CurrentFeatureToggleSubscription.unsubscribe();
    this.DeleteFeatureToggleSubscription.unsubscribe();
    this.AddFeatureToggleSubscription.unsubscribe();
    this.UpdateFeatureToggleSubscription.unsubscribe();
   
    // unsubscribe from Route.paramMap
    this.RouteParamMapSubscription.unsubscribe();
  }

  onSelect(featureToggle: FeatureToggle): void {
    this.router.navigate(['/features/'+featureToggle.id])
  }

  //HTTP GET to backend for all entries, and subscribe to params change once loaded
  getFeatureToggles(): void {
    this.featureToggleService.getFeatureToggles()
        .subscribe(featureToggles => 
          {
            this.featureToggles = featureToggles;
            //subscribe to route param listening
            this.routeParamSubcribe()
          }
        );
  }

  add(): void{
    this.router.navigate(['/features/add'])
  }

}
