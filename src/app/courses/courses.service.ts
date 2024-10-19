import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "../model/course";

// un service è caratterizzato dal decorator @Injectable, questo permette al nostro service di essere iniettato nel nostro componente tramite Dependency Injection nel costruttore della classe
// la proprietà providedIn con valore root indica che verrà creata una sola istanza della classe per l'intero progetto e può essere iniettata ed utilizzata ovunque, pattern di programmazione ad oggetti Singleton: una classe viene istanziata una sola volta e può essere utilizzata globalmente
// se rimuovessi questa proprietà otterrei un errore: No provider fro CoursesService, cioè ng non è in grado, in caso il service sia iniettato da qualche parte, di creare la dipendenza al service
// il provider (il fornitore) è ciò che crea la dipendenza, il provider fornisce al sistema una factory function che viene chiamata da ng per generare le dipendenze
// la proprietà providedIn genera il provider che verrà utilizzato da ng, detto tree-shakeable provider
// COSTRUZIONE DI UN PROVIDER
// questa cosa la posso confermare andando ad iniettare il service in più componenti e mettendo qui nel costruttore un console.log, in console troverò solo un console.log anche se ho iniettato il service in più componenti, proprio perchè il service viene istanziato una sola volta ed in tutti i componenti viene iniettata la stessa classe
// utilizzare la proprietà providedIn: "root" è la stessa cosa se registro il provider nei providers di app-module.ts, cioè il provider può essere utilizzato in tutta l'app
// utilizzare questa proprietà permette di non istanziare mai nell'app il service se non è mai stato utilizzato e permette di non occupare il bundle della memoria (lazy load, caricamento pigro, una cosa viene istanziata solo se utilizzata)
@Injectable()
//   {
//   providedIn: "root",
// }
export class CoursesService {
  // questo service prende i dati relativi ai corsi
  // restituisce un Observable<Course[]>
  constructor(private http: HttpClient) {}

  loadCourses(): Observable<Course[]> {
    const params = new HttpParams().set("page", "1").set("pageSize", "10");

    return this.http.get<Course[]>("/api/courses", {
      params: params,
    });
  }

  // definiamo una API che ci permetta di modificare un corso
  // il metodo riceve come argomento un corso
  saveCourse(course: Course): Observable<Course> {
    // per modificare il corso effettuiamo una chiamata put
    // il metodo put dell'httpclient di angular prevede che vengano passati 2 parametri: url con id dell'oggetto da modificare ed il body della chiamata put
    // il metodo restituisce un Observable, quindi per farlo funzionare dobbiamo sottoscriverci

    // passo un'istanza di intestazione Http, header, ad esempio passo un valore che posso utilizzare per autenticare la richiesta
    // la X- viene anteposta a quelle proprietà dell'header che non sono quelle di default

    const headers = new HttpHeaders().set("X-Auth", "userId");

    return this.http.put<Course>(`/api/courses/${course.id}`, course, {
      headers: headers,
    });
  }
}
