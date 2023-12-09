import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, NgModel, ReactiveFormsModule } from '@angular/forms';
import { PlaysService } from '../../services/plays.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  name = new FormControl('');
  ZOMBIES_NEEDED = 4;
  board: any[] = [];
  rows = 10;
  columns = 10;
  idGame: number = 0;
  idPlayer: number = 0;
  currentGame: any = {};
  playerNumber: number = 0;
  status: boolean = false;
  colorTile: number[][] = [];
  changeColor = 0;

  constructor(private playsService: PlaysService) {
    this.generateBoard(this.rows, this.columns);
  }
  ngOnInit() {}
  getGame() {
    this.playsService
      .getGameStatus(this.idGame, this.idPlayer, this.name.value as string)
      .subscribe((payload) => {
        this.currentGame = payload;
        this.status = true;
      });
  }
  startGame() {
    if (this.name.value === '') {
      alert('Necesitas colocar tu nombre');
    }
    if (this.quantityOfZombies(this.board) !== this.ZOMBIES_NEEDED) {
      alert(
        `necesitas al menos ${
          this.ZOMBIES_NEEDED
        } zombies y tienes ${this.quantityOfZombies(this.board)}`
      );
    }
    if (
      this.name.value !== '' &&
      this.quantityOfZombies(this.board) === this.ZOMBIES_NEEDED
    ) {
      this.playsService
        .selectBoard(this.board, this.name.value as string)
        .subscribe((e: any) => {
          this.idGame = e.idGame;
          this.idPlayer = e.idPlayer;
          this.getGame();
        });
    }
  }

  selectPlayBoard(x: number, y: number) {
    if (this.currentGame.player.playBoard[x][y] !== 0) {
      alert('Ya seleccionaste esta posición.');
      return;
    }
    if (this.currentGame.player.turn) {
      this.playsService
        .sendShot(this.idGame, this.idPlayer, x, y)
        .subscribe((payload) => {
          this.currentGame = payload;
          if (!this.currentGame.player.turn) {
            this.computerTurn();
          }
        });
    }
  }
  computerTurn() {
    const delay = 4000;
    setTimeout(() => {
      this.computerShot();
    }, delay);
  }

  computerShot() {
    this.playsService
      .sendComputerShot(this.idGame, this.idPlayer)
      .subscribe((payload) => {
        this.currentGame = payload;
        if (this.currentGame.rival.turn) {
          this.computerTurn();
        }
      });
  }
  selectTile(x: number, y: number) {
    if (
      this.quantityOfZombies(this.board) < this.ZOMBIES_NEEDED ||
      this.board[x][y] === 1
    ) {
      this.board[x][y] = this.board[x][y] === 1 ? 0 : 1;
    }
  }
  trackElement(index: number, element: { guid: any }) {
    return element ? element.guid : null;
  }
  generateBoard(rows: number, columns: number) {
    for (let i = 0; i < rows; i++) {
      let row: any[] = [];
      let probando: any[] = [];
      this.board.push(row);
      this.colorTile.push(probando);
      if (this.changeColor == 0) {
        this.changeColor = 1;
      } else {
        this.changeColor = 0;
      }
      for (let j = 0; j < columns; j++) {
        this.board[i].push(0);
        this.colorTile[i].push(this.changeColor);
        if (this.changeColor == 0) {
          this.changeColor = 1;
        } else {
          this.changeColor = 0;
        }
      }
    }
  }
  quantityOfZombies(board: number[]) {
    let count = 0;
    board.forEach((row: any) => {
      row.forEach((tile: any) => {
        if (tile === 1) {
          count++;
        }
      });
    });
    return count;
  }
}
