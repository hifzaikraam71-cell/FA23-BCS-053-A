import { Component } from '@angular/core';

// @Component decorator marks this class as an Angular Component and provides metadata
@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  standalone: false, 
  styleUrl: './app.component.css' 
})
export class AppComponent {
  // --- Component Properties ---
  
  // Used for Two-way binding
  studentNameInput: string = '';
  
  // Used for Property binding
  isButtonDisabled: boolean = true;
  
  // Array to hold multiple students (Demonstrates *ngFor and *ngIf)
  studentList: string[] = [];

  // Message received from child component
  childMessage: string = '';

  // --- Component Methods ---

  // Called when the input field changes to enable/disable the confirm button
  onInputChange() {
    this.isButtonDisabled = this.studentNameInput.trim().length === 0;
  }

  // Used for Event binding (called when the button is clicked)
  confirmStudent() {
    if (this.studentNameInput.trim().length > 0) {
      this.studentList.push(this.studentNameInput); // Add to the array
      this.studentNameInput = ''; // Clear the input field
      this.isButtonDisabled = true; // Disable button again
      this.childMessage = ''; // Clear any previous messages
    }
  }

  // Method to handle the custom event emitted by the child component (@Output)
  handleRemoveStudent(index: number) {
    const removedName = this.studentList[index];
    this.studentList.splice(index, 1); // Remove from the array
    this.childMessage = `${removedName} was successfully removed.`;
  }
}
