import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseCardComponent } from "./course-card/course-card.component";
import { CourseImageComponent } from "./course-image/course-image.component";
import { HighlightedDirective } from "./directives/highlighted.directive";
import { NgxUnlessDirective } from "./directives/ngx-unless.directive";
import { CoursesService } from "./courses.service";
import { FilterByCategoryPipe } from "./filter-by-category.pipe";

// il custom pipe va dichiarato nelle declarations del modulo
@NgModule({
  declarations: [
    CourseCardComponent,
    CourseImageComponent,
    HighlightedDirective,
    NgxUnlessDirective,
    FilterByCategoryPipe,
  ],
  imports: [CommonModule],
  // tutto quello che deve essere visibile all'esterno del modulo deve essere indicato qui
  exports: [
    CourseCardComponent,
    CourseImageComponent,
    HighlightedDirective,
    NgxUnlessDirective,
    FilterByCategoryPipe,
  ],
  providers: [CoursesService],
})
export class CoursesModule {}
