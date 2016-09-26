import {List,Record} from 'immutable';
// data model for snippet

const SnippetRecord = Record({
  id:0,
  title:"",
  rev: "",
  code: "",
  language: "javascript",
  description: "",
  tags: []
});
export class Snippet extends SnippetRecord{
  id: string;
  title: string;
  rev: string;
  code: string;
  language: string;
  description: string;
  tags: string[];

  constructor(props) {
      super(props);
  }
}
