import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core'
import {SnippetStore} from '../../providers/snippet-store/snippet-store';
import {LanguageStore} from '../../providers/lang-store/lang-store';
import {Snippet} from '../../providers/snippet-store/snippet';

@Component({
  selector: 'snippet-editor',
  templateUrl: './snippet-editor.html',
})
export class SnippetEditorComponent {
  private editor;
  private lang;
  private code;
  private _snippet:Snippet;
  private title: string;
  private description: string;
  private tags:Array<string>;
  @ViewChild('codeEditor') codeEditor;
  @Input()
  set snippet(snippet: Snippet) {
    if(snippet){
      this.code = snippet.code;
      this.title = snippet.title;
      this.lang = snippet.language;
      this.description = snippet.description;
      this.tags = snippet.tags;
      this._snippet = snippet;
    }
  }
  constructor(private snippetStore: SnippetStore, private langStore:LanguageStore){
    this.lang = "javascript";
    this.code = "";
    this.description="";
    this.tags = [];
  }
  save(){
    if(!this.title || this.title == ""){
      console.log("cannot save without title");
      return;
    }
    if(!this.lang || this.lang==""){
      console.log("cannot save without language");
      return;
    }
    var date=new Date();
    this.code = this.codeEditor.getValue();
    if(this._snippet){
      console.log(this._snippet);
      var snippet = new Snippet({
        code: this.code,
        language: this.lang,
        id: this._snippet.id,
        title: this.title,
        rev: this._snippet.rev,
        description: this.description,
        tags: this.tags
      });
      this.snippetStore.updateSnippet(snippet).subscribe(res=>{this.code=snippet.code;this.title=snippet.title; this.description = snippet.description; this.tags = snippet.tags});
    }else{
      var snippet = new Snippet({
        code: this.code,
        language: this.lang,
        title: this.title,
        description: this.description,
        tags: this.tags,
        id: this.lang + "_" + date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds()
      });
      this.snippetStore.addSnippet(snippet).subscribe(res=>{this.code="";this.title="";this.tags=[];this.description=""});
    }
  }
  newSnippet(){
    this.title="";
    this.code="";
    this.description="";
    this._snippet=null;
    this.lang = "javascript";
  }
}
