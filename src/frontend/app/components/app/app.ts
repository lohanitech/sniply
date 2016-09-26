import { Component } from '@angular/core';
import { SnippetStore } from '../../providers/snippet-store/snippet-store';
import { LanguageStore } from '../../providers/lang-store/lang-store';
import { DBService } from '../../providers/db-service/db-service';
@Component({
  selector: 'my-app',
  templateUrl: './app.html',
  providers: [SnippetStore, DBService, LanguageStore]
})
export class AppComponent {
  private snippet;
  private language;
  constructor(private snippetStore: SnippetStore, private langStore:LanguageStore){

  }
  onOpenSnippet(snippet){
    this.snippet = snippet;
  }
  onOpenSnippetForLanguage(language){
    this.language=language;
  }
}
