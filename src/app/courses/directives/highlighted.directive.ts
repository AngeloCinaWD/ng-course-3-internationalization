import {
  Directive,
  EventEmitter,
  Host,
  HostBinding,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { CoursesService } from "../courses.service";

@Directive({
  selector: "[highlighted]",
  exportAs: "hl",
})
export class HighlightedDirective {
  @Input("highlighted")
  isHighlighted = false;

  @Output()
  toggleHighlight = new EventEmitter();

  // all'interno di una directive possiamo iniettare un service, ad esempio CoursesService
  // iniettandolo così la direttiva utilizza l'istanza globale del service
  // constructor(private coursesService: CoursesService) {
  // se invece volessi utilizzare l'istanza relativa al service generato tramite provider locale del componente a cui è applicata la direttiva, devo utilizzare uno speciale decoratore @Host(), in questo modo NG va a cercare il provider nel componente a cui è applicata la direttiva (naturalmente se non c'è tramite registrazione nella proprietà providers del componente ottengo un errore che blocca l'esecuzione del codice)
  // constructor(@Host() private coursesService: CoursesService) {
  constructor() {
    console.log("Directive created..");
  }

  @HostBinding("class.highlighted")
  get cssClasses() {
    return this.isHighlighted;
  }

  @HostListener("mouseover", ["$event"])
  mouseOver($event) {
    console.log($event);

    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener("mouseleave")
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }
}
