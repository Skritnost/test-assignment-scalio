import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StringFieldFormComponent } from './string-field-form.component';

describe('StringFieldFormComponent', () => {
  let component: StringFieldFormComponent;
  let fixture: ComponentFixture<StringFieldFormComponent>;
  let form: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringFieldFormComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringFieldFormComponent);
    component = fixture.componentInstance;
    form = fixture.debugElement.query(By.css('form'));

    fixture.detectChanges();
  });

  it('should create',  () => {
    expect(component).toBeTruthy();
  });

  it('form field has a value',  () => {
    const userLogin = 'User123';

    component.fieldControl.setValue(userLogin);

    expect(component.fieldControl.value).toEqual(userLogin);
  });

  it('form is submitted',  () => {
    const userLogin = 'User123';

    component.fieldControl.setValue(userLogin);

    spyOn(component, 'submitForm').and.callThrough();
    spyOn(component.onFormSubmitted, 'emit').and.callThrough();

    form.triggerEventHandler('submit', null);

    expect(component.submitForm).toHaveBeenCalled();
    expect(component.onFormSubmitted.emit).toHaveBeenCalled();
  });

  it ('field is invalid',  () => {
    spyOn(component.onFormSubmitted, 'emit').and.callThrough();

    component.fieldControl.markAsDirty();

    form.triggerEventHandler('submit', null);

    expect(component.fieldControl.valid).toBeFalse();
    expect(component.onFormSubmitted.emit).toHaveBeenCalledTimes(0);
  });
});
