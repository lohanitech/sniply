import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core'
import {LanguageStore} from '../../providers/lang-store/lang-store';
import {Language} from '../../providers/lang-store/language';
@Component({
  selector: 'lang-list',
  templateUrl: './lang-list.html',
})
export class LanguageListComponent {
  private id:string;
  private title:string;
  @Output() onOpen = new EventEmitter<Language>();
  constructor(private langStore:LanguageStore){
  }
  openSnippetForLang(language){
      this.onOpen.emit(language);
  }
  save(){
    var lang = new Language({
      title: this.title,
      id: this.id
    });
    this.langStore.addLanguage(lang).subscribe(res=>{this.id="";this.title=""});
  }
}
