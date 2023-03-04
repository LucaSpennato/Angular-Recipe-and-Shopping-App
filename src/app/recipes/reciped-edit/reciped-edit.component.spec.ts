import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipedEditComponent } from './reciped-edit.component';

describe('RecipedEditComponent', () => {
  let component: RecipedEditComponent;
  let fixture: ComponentFixture<RecipedEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipedEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipedEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
