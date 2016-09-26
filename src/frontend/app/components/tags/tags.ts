import {Component, Input} from '@angular/core';

@Component({
   selector: 'tags',
   templateUrl: './tags.html',
})

export class TagsComponent {
  private _tags: Array<string>;
  private current:string;
  @Input()
  set tags(tags: Array<string>){
    this._tags = tags;
  }
  constructor() {
    this.current = "";
  }
  focus() {
    document.getElementById('tagInput').focus();
  }

  keyUp(event:KeyboardEvent) {
    if (event.keyCode === 32) {
      if(this.current.trim() != ""){
        this._tags.push(this.current.trim());
        this.current = '';
      }
    } else if (event.keyCode === 8 && this.current.length == 0 && this._tags.length>0){
      this.current = this._tags.pop();
    }
  }

  blur() {
    if (this.current !== '') {
      this._tags.push(this.current);
      this.current = '';
    }
  }
}
