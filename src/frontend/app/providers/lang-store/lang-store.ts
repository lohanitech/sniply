import {Injectable, Inject} from "@angular/core";
import {DBService} from "../db-service/db-service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Language} from "./language";
import {List} from 'immutable';
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class LanguageStore {
    private _languages: BehaviorSubject<List<Language>> = new BehaviorSubject(List([]));
    languages$ = this._languages.asObservable();
    constructor(private dbService: DBService) {
        this.loadInitialData();
    }

    get languages() {
        return this._languages.asObservable();
    }

    loadInitialData() {
        this.dbService.getLanguages()
            .subscribe(
                res => {
                  let result:any = res;
                    let languages = (<Object[]>(result.rows)).map((language: any) =>
                        new Language({
                          id:language.doc._id,
                          rev:language.doc._rev,
                          title:language.doc.title
                        })
                      );

                    this._languages.next(List(languages));
                },
                err => console.log("Error retrieving Todos")
            );

    }

    addLanguage(newLanguage:Language):Observable<any> {
        var addLang = JSON.parse(JSON.stringify(newLanguage));
        addLang._id = addLang.id;
        delete addLang.id;
        delete addLang.rev;
        let obs = this.dbService.addLanguage(addLang);

        obs.subscribe(
                res => {
                    this._languages.next(this._languages.getValue().push(newLanguage));
                });

        return obs;
    }

}
