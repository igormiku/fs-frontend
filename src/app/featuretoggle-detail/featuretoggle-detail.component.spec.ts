import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturetoggleDetailComponent } from './featuretoggle-detail.component';

describe('FeaturetoggleDetailComponent', () => {
  let component: FeaturetoggleDetailComponent;
  let fixture: ComponentFixture<FeaturetoggleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturetoggleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturetoggleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
