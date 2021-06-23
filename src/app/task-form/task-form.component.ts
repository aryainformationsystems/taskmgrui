import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private taskService: TaskService
  ) {
    this.taskForm = formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      estimate: [''],
      targetDate: [''],
      status: ['']
    });
  }

  ngOnInit(): void {}

  showList() {
    this.router.navigateByUrl('/home/task-list');
  }

  saveTask() {
    if (this.taskForm.invalid) {
      console.log(this.taskForm);
      this.snackbar.open('Please fill in the required fields.', 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
    } else {
      this.taskService.create(this.taskForm.value).subscribe(
        (result) => {
          this.snackbar.open('Task created successfully.', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            duration: 3000,
          });
          this.taskForm.reset();
        },
        (err) => {
          this.snackbar.open(
            'Error occured while saving task. Please contact administrator.',
            'Close',
            {
              verticalPosition: 'top',
              horizontalPosition: 'end',
              duration: 3000,
            }
          );
        }
      );
    }
  }
}
