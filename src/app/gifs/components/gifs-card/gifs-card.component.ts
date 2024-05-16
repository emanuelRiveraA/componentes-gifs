import { Component, Input, OnInit } from '@angular/core';
import { Gif, Rating, Type, SourceTLD, Images, User, Analytics } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.css']
})
export class GifsCardComponent implements OnInit{

  @Input()
  public gif!: Gif;//se agrega ! diciendole que siempre va a venir

  ngOnInit(): void {
    if( !this.gif ) throw new Error('Gif property is required');
  }

}
