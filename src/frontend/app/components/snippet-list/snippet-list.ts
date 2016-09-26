import {Component, ViewChild, Output, Input, EventEmitter} from '@angular/core'
import {FormControl} from '@angular/forms'
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import {SnippetStore} from '../../providers/snippet-store/snippet-store';
import {Snippet} from '../../providers/snippet-store/snippet';
import {Language} from '../../providers/lang-store/language';

@Component({
  selector: 'snippet-list',
  templateUrl: './snippet-list.html',
})
export class SnippetListComponent {
  private snippets;
  private filteredSnippets;
  private searchTerm;
  private searchControl: FormControl;
  private subscription: Subscription;
  private _lang:Language;
  private allSnippets;
  @Input()
  set language(language:Language){
    console.log(language);
    if(language){
      this._lang=language;
      this.filterSnippetsForLanguage();
    }
  }
  @Output() onOpen = new EventEmitter<Snippet>();
  constructor(private snippetStore:SnippetStore){
    this.searchTerm='';
    this.searchControl = new FormControl('');
    this.subscription = snippetStore.snippets$.subscribe(snippets=>{
      this.snippets=snippets;
      this.allSnippets = JSON.parse(JSON.stringify(this.snippets));
      if(this._lang){
        this.filterSnippetsForLanguage();
      }
      this.filterSnippets();
    });
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      console.log("at valueChanges");
            this.filterSnippets();
        });
  }
  openSnippet(snippet){
    this.onOpen.emit(snippet);
  }
  filterSnippetsForLanguage(){
    this.snippets = this.allSnippets.filter((item)=>{
      return item.language == this._lang.id;
    })
    this.filterSnippets();
  }
  filterSnippets(){
    this.filteredSnippets =  this.snippets.filter((item) => {
      return item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  removeLangFilter(){
    this._lang=null;
    this.snippets = this.allSnippets;
    this.filterSnippets();
  }
}
