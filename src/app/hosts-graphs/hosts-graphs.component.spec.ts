import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostsGraphsComponent } from './hosts-graphs.component';

describe('HostsGraphsComponent', () => {
  let component: HostsGraphsComponent;
  let fixture: ComponentFixture<HostsGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostsGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostsGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
