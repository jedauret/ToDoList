import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ITask, Task } from 'app/shared/model/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'jhi-task-update',
  templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    category: [null, [Validators.required]],
    description: [],
    due: [],
    complete: []
  });

  constructor(protected taskService: TaskService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ task }) => {
      this.updateForm(task);
    });
  }

  updateForm(task: ITask) {
    this.editForm.patchValue({
      id: task.id,
      title: task.title,
      category: task.category,
      description: task.description,
      due: task.due != null ? task.due.format(DATE_TIME_FORMAT) : null,
      complete: task.complete
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const task = this.createFromForm();
    if (task.id !== undefined) {
      this.subscribeToSaveResponse(this.taskService.update(task));
    } else {
      this.subscribeToSaveResponse(this.taskService.create(task));
    }
  }

  private createFromForm(): ITask {
    return {
      ...new Task(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      category: this.editForm.get(['category']).value,
      description: this.editForm.get(['description']).value,
      due: this.editForm.get(['due']).value != null ? moment(this.editForm.get(['due']).value, DATE_TIME_FORMAT) : undefined,
      complete: this.editForm.get(['complete']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
