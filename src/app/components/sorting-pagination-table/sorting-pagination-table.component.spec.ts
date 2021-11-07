import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableRowInterface } from '../../interfaces/table.interface';

import { SortingPaginationTableComponent } from './sorting-pagination-table.component';

const DEFAULT_DATA: TableRowInterface[] = [{
  first: { value: 'def', label: 'First' },
  second: { value: 'abc2', label: 'Second' },
},
  {
    first: { value: 'abc', label: 'First' },
    second: { value: 'bcd2', label: 'Second' },
  },
  {
    first: { value: 'bcd', label: 'First' },
    second: { value: 'def2', label: 'Second' },
  }];

const SORTED_DATA_BY_FIRST: TableRowInterface[]  = [{
  first: { value: 'abc', label: 'First' },
  second: { value: 'bcd2', label: 'Second' },
},
  {
    first: { value: 'bcd', label: 'First' },
    second: { value: 'def2', label: 'Second' },
  },
  {
    first: { value: 'def', label: 'First' },
    second: { value: 'abc2', label: 'Second' },
  }];

const SORTED_DATA_BY_SECOND: TableRowInterface[]  = [{
  first: { value: 'bcd', label: 'First' },
  second: { value: 'def2', label: 'Second' },
},
  {
    first: { value: 'abc', label: 'First' },
    second: { value: 'bcd2', label: 'Second' },
  },
  {
    first: { value: 'def', label: 'First' },
    second: { value: 'abc2', label: 'Second' },
  }];

describe('SortingPaginationTableComponent', () => {
  let component: SortingPaginationTableComponent;
  let fixture: ComponentFixture<SortingPaginationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortingPaginationTableComponent ],
      imports: [ MatTableModule, MatSortModule, MatPaginatorModule, BrowserAnimationsModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingPaginationTableComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    component.data = DEFAULT_DATA.map(row => ({ ...row }));
    fixture.detectChanges();
  });

  it('data is sorted by first column in acs order', () => {
    expect(component.dataSource.data).toEqual(SORTED_DATA_BY_FIRST);
  });

  it('data is sorted by second column in desc order', () => {
    component.dataSource.sort.sort({
      id: 'second',
      start: 'desc',
      disableClear: true,
    });

    expect(component.dataSource.data).toEqual(SORTED_DATA_BY_SECOND);
  });

  it('returns to the first page after sorting', () => {
    component.paginator.pageSize = 1;
    component.paginator.nextPage();

    component.dataSource.sort.sort({
      id: 'first',
      start: 'desc',
      disableClear: true,
    });

    expect(component.paginator.pageIndex).toEqual(0);
  });

  it('getColumnName returns column label', () => {
    const columnName = component.getColumnName('second');

    expect(columnName).toEqual('Second');
  });
});
