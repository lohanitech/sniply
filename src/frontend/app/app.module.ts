import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent }   from './components/app/app';
import { CodeEditorComponent } from './components/code-editor/code-editor';
import { SnippetEditorComponent } from './components/snippet-editor/snippet-editor';
import { SnippetListComponent } from './components/snippet-list/snippet-list';
import { LanguageListComponent } from './components/lang-list/lang-list';
import { TagsComponent } from './components/tags/tags';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [ AppComponent, CodeEditorComponent, SnippetEditorComponent, SnippetListComponent, LanguageListComponent, TagsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
