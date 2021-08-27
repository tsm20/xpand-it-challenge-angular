import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/Movie';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Filter } from 'src/app/Filter';
import { Pagination } from 'src/app/Pagination';
import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { FilterService } from 'src/app/services/filter.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['rank', 'title', 'year', 'revenue', 'icon'];
  movies: Movie[] = [];
  faEye = faEye;
  pagination: Pagination = {page: 0, size: 15}
  filter: Filter = {};
  // @ts-ignore
  @ViewChild(MatTable) table: MatTable<Movie>;
  subscription: Subscription = new Subscription();

  constructor(private movieService: MovieService, public dialog: MatDialog, private filterService: FilterService) {
    
   }

  ngOnInit(): void {
    this.movieService.getMovies(this.pagination, {}).subscribe((movies) => (this.movies = movies));
    this.subscription = this.filterService
    .getSubject()
    .subscribe((customFilter) => this.applyOrResetFilters(customFilter));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
}

  onFilterChanged(): void {
    this.subscription = this.filterService
    .getSubject()
    .subscribe((customFilter) => this.applyOrResetFilters(customFilter));
  }

  applyOrResetFilters(customFilter: any){
    //reset pagination when hasFilters
    this.pagination = {page: 0, size: 15}
    this.movieService.getMovies(this.pagination, customFilter.filter).subscribe((movies) => {
      if(customFilter.hasFilter){
        this.applyTop10(movies)
      }else{
        this.movies = movies
      }
    })
  };

  applyTop10(list: Movie[]): void {
    let temp = list;
    //sort revenue
    temp.sort((a, b) => Number(b.revenue) - Number(a.revenue));
    //save top 10
    this.movies = temp.slice(0, 10);
  }

  onScrollDown(ev: any): void {
    this.pagination = {page: this.pagination.page + 1, size: this.pagination.size };
    this.movieService.getMovies(this.pagination, {}).subscribe((movies) => movies.map(movie => {
       this.movies.push(movie)}))
      this.table.renderRows();
  }

  openDialog(id: string): void{
    this.movieService.getMovie(id).subscribe((movie) => this.dialog.open(PopupComponent, {maxHeight: '100vh - 50px', data: movie}));
  }

}
