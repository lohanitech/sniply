import {Component, ElementRef, ViewChild, Input} from '@angular/core'

@Component({
  selector: 'code-editor',
  templateUrl: './code-editor.html'
})
export class CodeEditorComponent {
  private el;
  private element;
  private editor;
  private lg;
  private editorOptions;
  private _code;
  @ViewChild('editorContainer') container;

  constructor(el:ElementRef){
    this.el = el;
  }
  @Input()
  set code(code: string) {
    this._code = code;
    if(this.editor){
      this.editor.setValue(this._code);
    }
  }
  @Input()
  set lang(lang: string){
    this.lg = lang;
    if(this.editor){
      monaco.editor.setModelLanguage(this.editor.getModel(),this.lg);
    }
  }
  ngAfterViewInit(){
    this.editorOptions = {
      value: this._code,
      language: this.lg,
      fontSize: 16,
      scrollBeyondLastLine: false
    }
    this.loadScript();
  }
  loadScript(){
    let script = document.getElementById('monaco-editor');
    if(script === null){
      let script = document.createElement('script');
      script.id = 'monaco-editor';
      script.onload = ()=>{
        this.initEditor();
      };
      script.src = './js/vs/loader.js';
      document.body.appendChild(script);
    }else{
      this.initEditor();
    }
  }
  initEditor(){
    (<any>window).require.config({paths:{'vs':'./js/vs'}});
     (<any>window).require(['./vs/editor/editor.main'], () => {
       this.editor = monaco.editor.create(this.container.nativeElement,this.editorOptions);
     });
  }
  getValue(){
    return this.editor.getValue();
  }
}
