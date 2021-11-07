import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

const ONLY_SPACES_PATTERN = Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/);

@Component({
  selector: 'app-string-field-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './string-field-form.component.html',
  styleUrls: ['./string-field-form.component.scss'],
})
export class StringFieldFormComponent {
  @Input() fieldName: string = '';
  @Input() isLoading: boolean = false;

  @Output() onFormSubmitted: EventEmitter<string> = new EventEmitter();

  fieldControl: FormControl = new FormControl('', [Validators.required, ONLY_SPACES_PATTERN]);

  private _lastValue: string = '';

  submitForm (): void {
    if (this.fieldControl.invalid) {
      this.fieldControl.markAsDirty();

      return;
    }

    if (this.isLoading) {
      return;
    }

    const { value } = this.fieldControl;

    if (this._lastValue === value) {
      return;
    }

    this._lastValue = value;

    this.onFormSubmitted.emit(value);
  }
}
