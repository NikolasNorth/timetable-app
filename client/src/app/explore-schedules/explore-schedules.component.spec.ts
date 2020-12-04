import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSchedulesComponent } from './explore-schedules.component';

describe('ExploreSchedulesComponent', () => {
  let component: ExploreSchedulesComponent;
  let fixture: ComponentFixture<ExploreSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
