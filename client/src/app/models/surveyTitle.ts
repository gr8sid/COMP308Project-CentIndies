import { Survey } from 'src/app/models/survey';

export class SurveyTitle {
// tslint:disable-next-line: variable-name
  _id: string;
  surveyName: string;
  surveyAuthor: string;
  questions: Survey[];
}
