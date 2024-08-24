import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="content">
      <span>{{ title }} is running!</span>
    </div>
  `,
  styles: [`
    .content {
      text-align: center;
    }
  `],
})
export class AppComponent {
  title = 'app';
}
