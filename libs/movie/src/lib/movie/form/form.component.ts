import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { createMovie, Movie, MovieQuery, MovieService } from '../+state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersistNgFormPlugin } from '@datorama/akita';
import { Router } from '@angular/router';
import { MovieForm } from './movie.form';

@Component({
  selector: 'movie-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit, OnDestroy {
  public persistForm: PersistNgFormPlugin;
  public movieForm: MovieForm;
  public movie: Movie;
  navLinks: any[];
  activeLinkIndex = -1; 

  constructor(
    private query: MovieQuery,
    private service: MovieService,
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    public form: MovieForm,
  ) {
    this.navLinks = [
      {
          label: 'Main Informations',
          link: './main',
          index: 0
      }, {
          label: 'Second',
          link: './second',
          index: 1
      }, {
          label: 'Third',
          link: './third',
          index: 2
      }, 
    ];

    this.movieForm = form;
  }

  ngOnInit() {

    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });

    this.movie = this.query.getActive();

    // Akita Persist Form 
    this.persistForm = new PersistNgFormPlugin(this.query, createMovie).setForm(this.movieForm);

    this.populateForm();


    /*

      directorName: [this.movie.directorName],
      poster: [this.movie.poster],
      productionYear: [this.movie.productionYear],
      types: [this.movie.types],
      : [],
      originCountry: [this.movie.originCountry],
      coProducerCountries: [this.movie.coProducerCountries],
      languages: [this.movie.languages],
      status: [this.movie.status],
      logline: [this.movie.logline, Validators.maxLength(180)],
      synopsis: [this.movie.synopsis, Validators.maxLength(500)],
    });
    */
    
    /* Do not be afraid great Smurf, this is a temporary hack ;)*/

    // @todo remove
    this.movieForm.get('originalTitle').setValue('undefined');
    this.movieForm.get('originalTitle').setValue(this.movie.title.original);
  }

  private populateForm() {
    this.movieForm.get('originalTitle').setValue(this.movie.title.original);
    this.movieForm.get('internationalTitle').setValue(this.movie.title.international);
    this.movieForm.get('genres').setValue(this.movie.genres);

    // Populate custom fields
    if (this.movie.keywords && this.movie.keywords.length) {
      this.movie.keywords.forEach((keyword) => {
        this.addFormControl(new FormControl(keyword), 'keywords');
      })
    }

    if (this.movie.credits && this.movie.credits.length) {
      this.movie.credits.forEach((credit) => {
        this.addFormControl(this.builder.group(credit), 'movieCredits');
      })
    }

    if (this.movie.images && this.movie.images.length) {
      this.movie.images.forEach((image) => {
        this.addFormControl(new FormControl(image), 'images');
      })
    }

    if (this.movie.promotionalElements && this.movie.promotionalElements.length) {
      this.movie.promotionalElements.forEach((element) => {
        this.addFormControl(this.builder.group(element), 'promotionalElements');
      })
    }
  }

  /* Getters for all form inputs */
  public currentFormValue(attr: string, index?: number) {
    if (index !== undefined) {
      const formArray = this.movieForm.get(attr) as FormArray;
      return formArray.controls[index] !== null ? formArray.controls[index].value : '' as String;
    } else {
      const input = this.movieForm.get(attr);
      return input !== null ? input.value: '' as String;
    }
  }

  public get keywords() {
    return this.movieForm.get('keywords') as FormArray;
  }

  public get movieCredits() {
    return this.movieForm.get('credits') as FormArray;
  }

  public get promotionalElements() {
    return this.movieForm.get('promotionalElements') as FormArray;
  }

  public get images() {
    return this.movieForm.get('images') as FormArray;
  }

  /* Saves the form */
  public submit() {
    if (!this.movieForm.valid) {
      this.snackBar.open('form invalid', 'close', { duration: 2000 });
      throw new Error('Invalid form');
    } else {
      this.snackBar.open(`${this.movieForm.get('originalTitle').value} saved.`, 'close', { duration: 2000 });
      this.service.update(this.query.getActiveId(), this.preUpdate({ ...this.movieForm.value }));
    }
  }

  /* Applies movie modifications to fit actual model */
  private preUpdate(movie: any) {
    movie.title = {};
    if (movie.originalTitle) {
      movie.title.original = movie.originalTitle;
    }

    if (movie.internationalTitle) {
      movie.title.international = movie.internationalTitle;
    }
    delete movie.originalTitle;
    delete movie.internationalTitle;

    return movie;
  }

  private clear() {
    this.persistForm.reset();
    this.movieForm.reset();
  }

  public cancel() {
    this.clear();
    this.router.navigateByUrl('');
  }

  public addFormControl(value: FormControl | FormGroup, key: string): void {
    this[key].push(value);
  }

  public removeFormControl(index: number, key: string): void {
    this[key].removeAt(index);
  }

  ngOnDestroy() {
    this.clear();
    this.persistForm.destroy();
  }
}
