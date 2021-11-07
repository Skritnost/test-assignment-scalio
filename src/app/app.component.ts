import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, finalize, Observable, Subject, takeUntil } from 'rxjs';

import { UserTableModel } from './components/models/userTableModel';
import { UsersApiServiceService } from './services/users-api-service.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  tableData: UserTableModel[] = [];

  private _isDataLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _destroy$: Subject<void> = new Subject();

  get isDataLoading$ (): Observable<boolean> {
    return this._isDataLoading.asObservable();
  }

  constructor (
    private _usersApiServiceService: UsersApiServiceService,
    private _changeDetection: ChangeDetectorRef,
  ) {
  }

  ngOnDestroy (): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onFormSubmitted (value: string): void {
    this._isDataLoading.next(true);

    this._usersApiServiceService.getUsers(value)
      .pipe(
        finalize(() => {
          this._isDataLoading.next(false);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe((users) => {
        this.tableData = users;

        this._changeDetection.detectChanges();
      });
  }
}
