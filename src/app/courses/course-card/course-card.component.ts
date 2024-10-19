import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation,
} from "@angular/core";
import { Course } from "src/app/model/course";
import { CourseImageComponent } from "../course-image/course-image.component";
import { CoursesService } from "../courses.service";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.css"],
})
export class CourseCardComponent implements OnInit {
  @Input()
  course: Course;

  @Input()
  cardIndex: number;

  // se definisco il nome come parmatro del decoratore questo sarà il nome dell'evento emesso (courseChanged), altrimenti il nome sarà il nome della proprietà (courseEmitter)
  @Output("courseChanged")
  courseEmitter = new EventEmitter<Course>();

  // creazione dipendenza del service CourseServive tramite @Inject del token injection creato in app.component
  // constructor(@Inject(COURSES_SERVICE) private cs: CoursesService) {}
  constructor() {}

  ngOnInit() {}

  // il metoodo onSaveClicked riceve il valore passato nell'input ed emette un evento custom che ha come payload un oggetto di tipo Course
  //   copia di un oggetto tramite destrutturazione
  // tramite destrutturazione dell'oggetto creo una copia dell'oggetto Course dell'istanza e sostituisco il valore della proprietà description in esso contenuta con quello passato da input
  // se metto il parametro description fra parentesi graffe ottengo un oggetto chiave valore {nome_parametro: valore_parametro}
  // l'evento emesso viene ascolato in app.component.html
  onSaveClicked(description: string) {
    this.courseEmitter.emit({ ...this.course, description });
  }
}
