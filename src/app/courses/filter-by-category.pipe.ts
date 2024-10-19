import { Pipe, PipeTransform } from "@angular/core";
import { Course } from "../model/course";

// un pipe è una classe ts esportata, decorata dal @Pipe decorator, che ha come argument un oggetto con diverse proprietà, tra le quali name, con il nome di come verrà richiamato il pipe nei templates
// il custom pipe va dichiarato nelle declarations del modulo
@Pipe({
  name: "filterByCategory",
  pure: false,
})
// la nostra classe implementa l'interfaccia PipeTransform che contiene un solo metodo, il metodo transform()
export class FilterByCategoryPipe implements PipeTransform {
  // questo metodo riceve 2 argomenti: il primo è l'input del pipe, nel nostro caso è un array di Course
  //   il secondo argomento è quello che vogliamo filtare, nel nostro caso è il valore BEGINNER
  // quello che restituisce il metodo transform è quello che restituirà il pipe
  //   un pipe viene chiamato da angular solo una volta, oppure se l'input del pipe cambia, per evitare problemi di prestazioni
  //   i pipe che vengono richiamati solo se l'input cambia si chiamano PIPE PURI
  //   per rendere IMPURO un pipe dobbiamo dichiarare la proprietà pure: false nel decoratore (esempio del bottone col cambio della categoria)
  transform(courses: Course[], category: string) {
    let newArrayCourses: Course[] = [];

    courses.forEach((course) => {
      newArrayCourses.push({
        ...course,
        description: course.description.toUpperCase(),
      });
    });

    return newArrayCourses.filter((course) => course.category === category);
    // return courses
    //   .filter((course) => course.category === category)
    //   .map((course) => course.description.toUpperCase());
  }
}
