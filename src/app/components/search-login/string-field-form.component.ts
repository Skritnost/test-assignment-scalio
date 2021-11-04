import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-string-field-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './string-field-form.component.html',
  styleUrls: ['./string-field-form.component.scss'],
})
export class StringFieldFormComponent {
  @Input() fieldName: string = '';

  @Output() onFormSubmitted: EventEmitter<string> = new EventEmitter();

  fieldControl: FormControl = new FormControl('', [Validators.required]);

  submitForm (): void {
    if (this.fieldControl.invalid) {
      this.fieldControl.markAsDirty();

      return;
    }

    const { value } = this.fieldControl;

    this.onFormSubmitted.emit(value);
  }
}
