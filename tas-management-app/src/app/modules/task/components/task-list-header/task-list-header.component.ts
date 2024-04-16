import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'task-list-header',
  templateUrl: './task-list-header.component.html',
  styleUrls: ['./task-list-header.component.css']
})
export class TaskListHeaderComponent {
  @Output() createNewTaskEvent = new EventEmitter();

  createNewTask(){
    this.createNewTaskEvent.emit();
  }
}
