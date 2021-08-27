import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';

import { MovieService } from './movie.service';
import { Movie } from 'src/app/Movie';
import { Pagination } from 'src/app/Pagination'
import { Filter } from 'src/app/Filter'

describe('MovieService', () => {
  let service: MovieService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test
      providers: [ MovieService ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MovieService);
  });
  
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  
  describe('#getMovies', () => {
    let expectedMovies: Movie[];
    let pagination: Pagination = {page: 0, size: 15}
    let emptyPagination: Pagination = {page: 0, size: 0}
    let filter: Filter = {start: 2014, end: 2014};
    let emptyFilter: Filter = {};
    
    beforeEach(() => {
      service = TestBed.inject(MovieService);
      expectedMovies = [
        {id: "6019683cf29db7802550f198", title: "Guardians of the Galaxy", year: 2014, rank: 1,revenue: 333.13},
        {id: "6019683cf29db7802550f18c", title: "Prometheus", year: 2012, rank: 2, revenue: 126.46},
        {id: "6019683cf29db7802550f192", title: "Split", year: 2016, rank: 3, revenue: 138.12},
        {id: "6019683cf29db7802550f197", title: "Sing", year: 2016, rank: 4, revenue: 270.32},
        {id: "6019683cf29db7802550f18d", title: "Suicide Squad", year: 2016, rank: 5, revenue: 325.02},
        {id: "6019683cf29db7802550f18e", title: "The Great Wall", year: 2016, rank: 6, revenue: 45.13},
        {id: "6019683cf29db7802550f18f", title: "La La Land", year: 2016, rank: 7, revenue: 151.06},
        {id: "6019683cf29db7802550f190", title: "Mindhorn", year: 2016, rank: 8, revenue: null},
        {id: "6019683cf29db7802550f191", title: "The Lost City of Z", year: 2016, rank: 9, revenue: 8.01},
        {id: "6019683cf29db7802550f193", title: "Passengers", year: 2016, rank: 10, revenue: 100.01},
        {id: "6019683cf29db7802550f194", title: "Fantastic Beasts and Where to Find Them", year: 2016, revenue: 234.02},
        {id: "6019683cf29db7802550f196", title: "Hidden Figures", year: 2016, rank: 12, revenue: 169.27},
        {id: "6019683cf29db7802550f195", title: "Rogue One", year: 2016, rank: 13, revenue: 532.17},
        {id: "6019683cf29db7802550f199", title: "Moana", year: 2016, rank: 14, revenue: 248.75},
        {id: "6019683cf29db7802550f19a", title: "Colossal", year: 2016, rank: 15, revenue: 2.87}       
       ] as Movie[];
    });

    it('should return expected movies (called once)', () => {
      service.getMovies(pagination, emptyFilter).subscribe(
        movies => {
          expect(movies).toEqual(expectedMovies, 'should return expected Movies'),
          expect(movies.length).toEqual(expectedMovies.length, `should have ${expectedMovies.length} movies`),
        fail
        });

      // movieService should have made one request to GET Movies from expected URL
      const req = httpTestingController.expectOne(`${service.apiUrl}?page=${pagination.page}&size=${pagination.size}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock Movies
      req.flush({content: expectedMovies});
    });

    
    it('should be OK returning no movies', () => {
      service.getMovies(emptyPagination, filter).subscribe(
        movies => expect(movies.length).toEqual(0, 'should have empty movies array'),
        fail
      );
      const req = httpTestingController.expectOne(`${service.apiUrl}?page=${emptyPagination.page}&size=${emptyPagination.size}&start=${filter.start}&end=${filter.end}`);
      req.flush({content: []}); // Respond with no movies
    });


    it('should return expected movies (called multiple times)', () => {
      service.getMovies(pagination, emptyFilter).subscribe();
      service.getMovies(pagination, emptyFilter).subscribe();
      service.getMovies(pagination, emptyFilter).subscribe(
        movies => expect(movies).toEqual(expectedMovies, 'should return expected movies'),
        fail
      );
      const requests = httpTestingController.match(`${service.apiUrl}?page=${pagination.page}&size=${pagination.size}`);
      expect(requests.length).toEqual(3, 'calls to getmovies()');
      // Respond to each request with different mock hero results
      requests[0].flush([]);
      requests[1].flush([]);
      requests[2].flush({content: expectedMovies});
    });
  })

  describe('#getMovie', () => {
    let expectedMovie: Movie;
    
    beforeEach(() => {
      service = TestBed.inject(MovieService);
      expectedMovie = {
        id: "6019683cf29db7802550f198", 
        title: "Guardians of the Galaxy", 
        year: 2014, 
        rank: 1,
        actors: "Chris Pratt, Vin Diesel, Bradley Cooper, Zoe Saldana",
        description: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
        director: "James Gunn",
        genre: "Action,Adventure,Sci-Fi",
        metascore: 76,
        rating: 8.1,
        revenue: 333.13,
        runtime: 121,
        votes: 757074,
      } as Movie;
    });

    it('should return expected movie (called once)', () => {
      service.getMovie(expectedMovie.id).subscribe(
        movie => {
          expect(movie).toEqual(expectedMovie, 'should return expected Movie'),
        fail
        });

      // movieService should have made one request to GET Movies from expected URL
      const req = httpTestingController.expectOne(`${service.apiUrl}/${expectedMovie.id}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock Movies
      req.flush(expectedMovie);
    });
  })

  
});
