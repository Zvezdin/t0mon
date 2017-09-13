import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxtReaderComponent } from './txt-reader.component';

describe('TxtReaderComponent', () => {
  let component: TxtReaderComponent;
  let fixture: ComponentFixture<TxtReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxtReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxtReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
