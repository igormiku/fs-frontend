import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturetoggleListComponent } from './featuretoggle-list.component';

describe('FeaturetoggleListComponent', () => {
  let component: FeaturetoggleListComponent;
  let fixture: ComponentFixture<FeaturetoggleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturetoggleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturetoggleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
