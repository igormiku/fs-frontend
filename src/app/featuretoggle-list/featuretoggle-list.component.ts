import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { FeatureToggle } from '../featuretoggle';
import { FeatureToggleService } from '../featuretoggle.service';

@Component({
  selector: 'app-featuretoggle-list',
  templateUrl: './featuretoggle-list.component.html',
  styleUrls: ['./featuretoggle-list.component.css']
})


export class FeaturetoggleListComponent implements OnInit {

  selectedFeatureToggle?: FeatureToggle;
  featureToggles : FeatureToggle[] = []

  //this subscribes to Observable to listen for changes in FeatureToggleList
  notifierSubscription: Subscription = this.featureToggleService.subjecFeatureToggleServiceNotifier.subscribe(notified => {
    this.getFeatureToggles();

  });

  constructor(private featureToggleService: FeatureToggleService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.getFeatureToggles();
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  onSelect(featureToggle: FeatureToggle): void {
    this.selectedFeatureToggle = featureToggle;
    this.router.navigate(['/features/'+featureToggle.id])
  }

  getFeatureToggles(): void {
    this.featureToggleService.getFeatureToggles()
        .subscribe(featureToggles => this.featureToggles = featureToggles);
  }

  add(): void{
    this.router.navigate(['/features/add'])

  }

}
