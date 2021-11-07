import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { Sort } from '@angular/material/sort/sort';
import { MatTableDataSource } from '@angular/material/table';

import { TableInterface, TableRowInterface } from '../../interfaces/table.interface';

@Component({
  selector: 'app-sorting-pagination-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sorting-pagination-table.component.html',
  styleUrls: ['./sorting-pagination-table.component.scss'],
})
export class SortingPaginationTableComponent implements AfterViewInit {
  @Input() pageSize: number = 10;
  @Input()
  set data (value: TableRowInterface[]) {
    const data = value || [];
    const firstEntity = data[0] || {};

    this.dataSource.data = data;

    this.columnDef = Object.keys(firstEntity)
      .filter((key) => !firstEntity[key].isHidden);

    if (this.dataSource.sort) {
      this.initSorting();
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly defaultSortDirection: SortDirection = 'asc';

  dataSource: MatTableDataSource<TableRowInterface> = new MatTableDataSource<TableRowInterface>([]);
  columnDef: string[] = [];

  get dataLength (): number {
    return this.dataSource?.data.length;
  }

  ngAfterViewInit (): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getColumnName (key: string): string {
    const columnEntity = this.dataSource.data[0] || {};

    return columnEntity[key].label || key;
  }

  onSortData ({ direction, active: columnId }: Sort): void {
    const { data: unsortedData, paginator } = this.dataSource;

    paginator.firstPage();

    this.dataSource.data = unsortedData.sort((a, b) => {
      const isAsc = direction === 'asc';

      const firstValue = this.getSortingValue(a[columnId]);
      const secondValue = this.getSortingValue(b[columnId]);

      return (firstValue < secondValue ? -1 : 1) * (isAsc ? 1 : -1);
    });
  }

  private getSortingValue ({ value }: TableInterface): string | number {
    return typeof value === 'string' ? value.toLowerCase() : value;
  }

  private initSorting (): void {
    const { sort: sortInstance } = this.dataSource;

    if (
      sortInstance.active === this.columnDef[0]
      && sortInstance.direction === this.defaultSortDirection
    ) {
      this.onSortData({
        direction: this.defaultSortDirection,
        active: this.columnDef[0],
      });

      return;
    }

    sortInstance.sort({
      id: this.columnDef[0],
      start: this.defaultSortDirection || 'asc',
      disableClear: true,
    });
  }
}
