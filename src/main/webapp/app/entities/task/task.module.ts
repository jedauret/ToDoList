import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TodolistSharedModule } from 'app/shared/shared.module';
import { TaskComponent } from './task.component';
import { TaskDetailPopupComponent, TaskDetailComponent } from './task-detail.component';
import { TaskUpdateComponent } from './task-update.component';
import { TaskDeletePopupComponent, TaskDeleteDialogComponent } from './task-delete-dialog.component';
import { taskRoute, taskPopupRoute } from './task.route';

const ENTITY_STATES = [...taskRoute, ...taskPopupRoute];

@NgModule({
  imports: [TodolistSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TaskComponent,
    TaskDetailPopupComponent,
    TaskUpdateComponent,
    TaskDeleteDialogComponent,
    TaskDeletePopupComponent,
    TaskDetailComponent
  ],
  entryComponents: [TaskDeleteDialogComponent, TaskDetailComponent]
})
export class TodolistTaskModule {}
