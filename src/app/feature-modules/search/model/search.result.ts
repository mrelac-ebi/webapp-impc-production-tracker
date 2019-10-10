import { Project } from '../../projects/model/project';

export class SearchResult {
    input: string;
    project:  Project;
    comment: string;
    searchResultComments: string[];
}