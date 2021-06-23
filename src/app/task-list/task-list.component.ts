import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Task>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  resultsLength = 0;

  displayedColumns = [
    'title',
    'category',
    'estimate',
    'createdAt',
    'targetDate',
    'actions',
  ];

  constructor(
    private taskService: TaskService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fetchAndUpdate();
    this.paginator.page.subscribe((pageEvent) => {
      this.fetchAndUpdate();
    });
    this.sort.sortChange.subscribe((pageEvent) => {
      this.fetchAndUpdate();
    });
  }

  fetchAndUpdate() {
    this.taskService
      .getPage(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        {}
      )
      .subscribe(
        (result) => {
          this.dataSource = new MatTableDataSource<Task>(result.data[1]);
          this.resultsLength = result.data[0];
        },
        (err) => {
          this.snackbar.open(
            'Could not fetch tasks. Please contact administrator.',
            'Close',
            {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000,
            }
          );
        }
      );
  }

  showForm() {
    this.router.navigateByUrl('/home/task-form');
  }
}
