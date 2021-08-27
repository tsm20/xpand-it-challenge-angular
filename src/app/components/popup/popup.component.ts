import { Component, OnInit, Input, Inject } from '@angular/core';
import { Movie } from 'src/app/Movie';
import {  MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  animate: boolean = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Movie) { }

  ngOnInit(): void {
  }

  onMouseMove(e: any): void {
    this.animate = true;
  }
  onMouseLeave(e:any): void {
    this.animate = false;
  }

}
