// in questo file creo un oggetto di un certo tipo con un suo token injection e poi lo inietterò nel costruttore di app.component.ts

import { InjectionToken } from "@angular/core";

// con questa interface dichiaro il type, quindi un oggetto che dovrà contenere queste 2 proprietà
export interface AppConfig {
  apiUrl: string;
  courseCacheSize: number;
}

// definisco l'oggetto con i valori
export const APP_CONFIG: AppConfig = {
  apiUrl: "http://localhost:9000",
  courseCacheSize: 50,
};

// creo il token injection per questo oggetto di configurazione
// il secondo parametro è un oggetto di configurazione per indicare che questo provider sia di tipo SINGLETON PATTERN, TREE-SHAKEABLE provider
// in esso indico a livello di cosa deve essere fornito (in tutta l'app) e cosa ritorna (l'oggetto APP_CONFIG)
// va comunque utilizzato il decoratore @Inject(nomeToken) nel costruttore di dove lo richiamo
export const CONFIG_TOKEN = new InjectionToken<AppConfig>("CONFIG_TOKEN", {
  providedIn: "root",
  factory: () => APP_CONFIG,
});
