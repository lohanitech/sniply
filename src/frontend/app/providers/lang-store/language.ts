import {List,Record} from 'immutable';
// data model for snippet

const LanguageRecord = Record({
  id:0,
  title:"",
  rev: ""
});
export class Language extends LanguageRecord{
  id: string;
  title: string;
  rev: string;

  constructor(props) {
      super(props);
  }
}
