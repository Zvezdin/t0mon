import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsGraphsComponent } from './jobs-graphs.component';

describe('JobsGraphsComponent', () => {
  let component: JobsGraphsComponent;
  let fixture: ComponentFixture<JobsGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
