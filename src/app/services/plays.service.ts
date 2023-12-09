import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, mergeMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaysService {
  private plays = [];
  private urlApi = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}
  getGameStatus(idGame: number, idPlayer: number, namePlayer: string) {
    return this.http.get(
      `${this.urlApi}/get-game/${idGame}/${idPlayer}/${namePlayer}`
    );
  }
  sendShot(
    idGame: number,
    idPlayer: number,
    xPosition: number,
    yPosition: number
  ) {
    return this.http.post(`${this.urlApi}/shot`, {
      idGame,
      idPlayer,
      xPosition,
      yPosition,
    });
  }
  sendComputerShot(idGame: number, idPlayer: number) {
    return this.http.post(`${this.urlApi}/shot-computer`, {
      idGame,
      idPlayer,
    });
  }
  selectBoard(board: number[][], playerName: string) {
    return this.http.post(`${this.urlApi}/select-board`, {
      board,
      playerName,
    });
  }
}
