import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableVisualizationComponent } from './datatable-visualization.component';

describe('DatatableVisualizationComponent', () => {
  let component: DatatableVisualizationComponent;
  let fixture: ComponentFixture<DatatableVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
