import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Rx";

let PouchDB = require('pouchdb');
PouchDB.debug.enable('pouchdb:api');
@Injectable()
export class DBService{
private _db:any;
private _lDB:any;
private allSnippets;
  constructor(){
    this.initDB();
  }
  initDB() {
    this._db = new PouchDB('snippets');
    this._lDB = new PouchDB('languages');
    (<any>window).PouchDB = PouchDB;
  }

  addSnippet(snippet): Observable<any> {
    return Observable.fromPromise(this._db.put(snippet));
  }
  getSnippets():Observable<any> {
    return Observable.fromPromise(this._db.allDocs({include_docs:true,decending:true}));
  }
  getSnippetsByLanguage(){
    return this._db.allDocs({include_docs: true, descending: true, startkey:"javascript_\uffff", endkey:"javascript_", inclusive_end: true});
  }
  addLanguage(lang):Observable<any> {
    return Observable.fromPromise(this._lDB.put(lang));
  }
  getLanguages():Observable<any> {
    return Observable.fromPromise(this._lDB.allDocs({include_docs:true}));
  }
}
