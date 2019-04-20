import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyTitleComponent } from './survey-title.component';

describe('SurveyTitleComponent', () => {
  let component: SurveyTitleComponent;
  let fixture: ComponentFixture<SurveyTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
