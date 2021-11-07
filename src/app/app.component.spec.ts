import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { AppComponent } from './app.component';
import { StringFieldFormComponent } from './components/search-login/string-field-form.component';
import { SortingPaginationTableComponent } from './components/sorting-pagination-table/sorting-pagination-table.component';
import { UserTableModel } from './models/userTableModel';
import { UsersApiServiceService } from './services/users-api-service.service';

const USERS_MOCK: UserTableModel[] = [{
  id: { value: 1, label: 'Id' },
  login: { value: 'One', label: 'Login' },
  avatarUrl: { value: 'url', label: 'Avatar url' },
  type: { value: 'User', label: 'Type' },
}];

class UsersApiServiceServiceMock {
  getUsers (value: string): Observable<UserTableModel[]> {
    return of(USERS_MOCK);
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        {
          provide: UsersApiServiceService,
          useClass: UsersApiServiceServiceMock,
        },
      ],
      declarations: [
        StringFieldFormComponent,
        SortingPaginationTableComponent,
        AppComponent,
      ],
    }).compileComponents();
  });

  it('onFormSubmitted returns users', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.onFormSubmitted('user');

    expect(component.tableData).toEqual(USERS_MOCK);
    // @ts-ignore
    expect(component._isDataLoading.value).toEqual(false);
  });
});
