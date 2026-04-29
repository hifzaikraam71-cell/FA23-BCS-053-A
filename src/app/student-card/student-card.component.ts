import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  standalone: false,
  styleUrl: './student-card.component.css'
})
export class StudentCardComponent {
  // @Input decorator allows this property to receive data from the parent component
  @Input() studentData: string = '';
  @Input() studentIndex: number = 0;

  // @Output decorator combined with EventEmitter allows emitting custom events to the parent
  @Output() removeEvent = new EventEmitter<number>();

  // Method triggered by event binding in the child template
  removeStudent() {
    // Emits the student's index up to the parent component so the parent can delete it
    this.removeEvent.emit(this.studentIndex);
  }
}
