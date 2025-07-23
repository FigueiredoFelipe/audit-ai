import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeFormComponent } from './analyze-form.component';

describe('AnalyzeFormComponent', () => {
  let component: AnalyzeFormComponent;
  let fixture: ComponentFixture<AnalyzeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
