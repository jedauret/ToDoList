import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITask } from 'app/shared/model/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'jhi-task-detail',
  templateUrl: './task-detail.component.html'
})
export class TaskDetailComponent {
  task: ITask;

  constructor(
    protected router: Router,
    protected taskService: TaskService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }
}

@Component({
  selector: 'jhi-task-detail-popup',
  template: ''
})
export class TaskDetailPopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ task }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TaskDetailComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.task = task;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/task', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/task', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
