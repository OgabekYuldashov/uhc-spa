import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsMainComponent } from './results-main.component';

describe('ResultsMainComponent', () => {
  let component: ResultsMainComponent;
  let fixture: ComponentFixture<ResultsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
