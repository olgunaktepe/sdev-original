import { Component } from '@angular/core'
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import {
  NgbDropdownModule,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular'

interface TodoDataItems {
  id: number
  text: string
  done: boolean
}

@Component({
  selector: 'crm-todo',
  standalone: true,
  imports: [
    NgbDropdownModule,
    SimplebarAngularModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo.component.html',
  styles: ``,
})
export class TodoComponent {
  todoData: TodoDataItems[] = [
    { id: 1, text: 'Design One page theme', done: false },
    { id: 2, text: 'Build a js based app', done: true },
    { id: 3, text: 'Creating component page', done: true },
    { id: 4, text: 'Testing??', done: true },
    { id: 5, text: 'Hehe!! This looks cool!', done: false },
    { id: 6, text: 'Create new version 3.0', done: false },
    { id: 7, text: 'Build an angular app', done: true },
    { id: 8, text: 'Vue Admin & Dashboard', done: false },
  ]

  addTodo: boolean = true
  todoForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      newTodo: ['', Validators.required],
    })
  }

  get remainingTodos(): number {
    return this.todoData.filter((todo) => !todo.done).length
  }

  saveTodo(): void {
    const newTodoText = this.todoForm.get('newTodo')?.value
    const newTodo: TodoDataItems = {
      id: this.todoData.length + 1,
      text: newTodoText,
      done: false,
    }
    this.todoData.unshift(newTodo)
    this.todoForm.reset()
  }

  toggleTodo(todo: TodoDataItems): void {
    todo.done = !todo.done
  }

  archiveTodos(): void {
    this.todoData = this.todoData.filter((todo) => !todo.done)
  }
}
