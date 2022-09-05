import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSplitComponent } from './add-edit-split.component';

describe('AddEditSplitComponent', () => {
  let component: AddEditSplitComponent;
  let fixture: ComponentFixture<AddEditSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSplitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
