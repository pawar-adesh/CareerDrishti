import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSectionBComponent } from './test-section-b.component';

describe('TestSectionBComponent', () => {
  let component: TestSectionBComponent;
  let fixture: ComponentFixture<TestSectionBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSectionBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSectionBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
