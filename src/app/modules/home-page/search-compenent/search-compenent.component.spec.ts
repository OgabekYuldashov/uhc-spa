import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompenentComponent } from './search-compenent.component';

describe('SearchCompenentComponent', () => {
  let component: SearchCompenentComponent;
  let fixture: ComponentFixture<SearchCompenentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCompenentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCompenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
