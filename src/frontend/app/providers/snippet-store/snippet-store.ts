import {Injectable, Inject} from "@angular/core";
import {DBService} from "../db-service/db-service";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Snippet} from "./snippet";
import {List} from 'immutable';
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class SnippetStore {

    private _snippets: BehaviorSubject<List<Snippet>> = new BehaviorSubject(List([]));
    snippets$ = this._snippets.asObservable();
    constructor(private dbService: DBService) {
        this.loadInitialData();
    }

    get snippets() {
        return this._snippets.asObservable();
    }

    loadInitialData() {
        this.dbService.getSnippets()
            .subscribe(
                res => {
                  let result:any = res;
                    let snippets = (<Object[]>(result.rows)).map((snippet: any) =>
                        new Snippet({
                          id:snippet.doc._id,
                          code:snippet.doc.code,
                          language: snippet.doc.language,
                          rev:snippet.doc._rev,
                          title:snippet.doc.title,
                          description: snippet.doc.description,
                          tags: snippet.doc.tags
                        })
                      );

                    this._snippets.next(List(snippets));
                },
                err => console.log("Error retrieving Todos")
            );

    }

    addSnippet(newSnippet:Snippet):Observable<any> {
        var addSnip = JSON.parse(JSON.stringify(newSnippet));
        addSnip._id = addSnip.id;
        delete addSnip.id;
        delete addSnip.rev;
        let obs = this.dbService.addSnippet(addSnip);

        obs.subscribe(
                res => {
                  var addSnip = JSON.parse(JSON.stringify(newSnippet));
                  addSnip.rev = res.rev;
                    this._snippets.next(this._snippets.getValue().push(addSnip));
                });

        return obs;
    }

    updateSnippet(updatedSnippet:Snippet):Observable<any>{
      var addSnip = JSON.parse(JSON.stringify(updatedSnippet));
      addSnip._id = addSnip.id;
      addSnip._rev = addSnip.rev;
      delete addSnip.id;
      delete addSnip.rev;
      let obs = this.dbService.addSnippet(addSnip);

      obs.subscribe(
              res => {
                let snippets = this._snippets.getValue();
                let index = snippets.findIndex((snippet: Snippet) => snippet.id === updatedSnippet.id);
                let snippet:Snippet = snippets.get(index);
                console.log(updatedSnippet);
                this._snippets.next(snippets.set(index,updatedSnippet ));
              });

      return obs;
    }
}
