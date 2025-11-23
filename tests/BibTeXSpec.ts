import { BibTeXType } from '../src/BibTeX';

export class BibTexSpec {
  constructor(
    address: string,
    author: string,
    booktitle: string,
    doi: string,
    edition: string,
    editor: string,
    howpublished: string,
    institution: string,
    issn: string,
    journal: string,
    key: string,
    month:
      | number
      | 'jan'
      | 'feb'
      | 'mar'
      | 'apr'
      | 'may'
      | 'jun'
      | 'jul'
      | 'aug'
      | 'sep'
      | 'oct'
      | 'nov'
      | 'dec',
    note: string,
    number: string,
    organization: string,
    pages: string,
    publisher: string,
    school: string,
    series: string,
    title: string,
    type: string,
    url: string,
    volume: string,
    year: string,
  ) {
    this.address = address;
    this.author = author;
    this.booktitle = booktitle;
    this.doi = doi;
    this.edition = edition;
    this.editor = editor;
    this.howpublished = howpublished;
    this.institution = institution;
    this.issn = issn;
    this.journal = journal;
    this.key = key;
    this.month = month;
    this.note = note;
    this.number = number;
    this.organization = organization;
    this.pages = pages;
    this.publisher = publisher;
    this.school = school;
    this.series = series;
    this.title = title;
    this.type = type;
    this.url = url;
    this.volume = volume;
    this.year = year;
  }

  address: string;
  author: string;
  booktitle: string;
  doi: string;
  edition: string;
  editor: string;
  howpublished: string;
  institution: string;
  issn: string;
  journal: string;
  key: string;
  month:
    | number
    | 'jan'
    | 'feb'
    | 'mar'
    | 'apr'
    | 'may'
    | 'jun'
    | 'jul'
    | 'aug'
    | 'sep'
    | 'oct'
    | 'nov'
    | 'dec';
  note: string;
  number: string;
  organization: string;
  pages: string;
  publisher: string;
  school: string;
  series: string;
  title: string;
  type: string;
  url: string;
  volume: string;
  year: string;
}

export function specFor(type: BibTeXType): BibTexSpec {
  return {
    address: `address-${type.toString()}`,
    author: `author-${type.toString()}`,
    booktitle: `booktitle-${type.toString()}`,
    doi: `doi-${type.toString()}`,
    edition: `edition-${type.toString()}`,
    editor: `editor-${type.toString()}`,
    howpublished: `howpublished-${type.toString()}`,
    institution: `institution-${type.toString()}`,
    issn: `issn-${type.toString()}`,
    journal: `journal-${type.toString()}`,
    key: `${type}-0`,
    month: 'jan',
    note: `note-${type.toString()}`,
    number: `number-${type.toString()}`,
    organization: `organization-${type.toString()}`,
    pages: `pages-${type.toString()}`,
    publisher: `publisher-${type.toString()}`,
    school: `school-${type.toString()}`,
    series: `series-${type.toString()}`,
    title: `title-${type.toString()}`,
    type: `type-${type.toString()}`,
    url: `url-${type.toString()}`,
    volume: `volume-${type.toString()}`,
    year: `year-${type.toString()}`,
  };
}
