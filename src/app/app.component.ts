import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BoardComponent } from './components/board/board.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    BoardComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  title = 'Battleship-bus';
}
