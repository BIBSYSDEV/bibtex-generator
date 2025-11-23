export enum BibTeXType {
  Article = 'article',
  Book = 'book',
  Booklet = 'booklet',
  InBook = 'inbook',
  InCollection = 'incollection',
  InProceedings = 'inproceedings',
  Manual = 'manual',
  MastersThesis = 'mastersthesis',
  Misc = 'misc',
  PhdThesis = 'phdthesis',
  Proceedings = 'proceedings',
  TechReport = 'techreport',
  Unpublished = 'unpublished',
}

export interface KeyField {
  key: string;
}

export interface CommonOptional {
  url?: string;
  annote?: string;
}

export interface BasicFields {
  title: string;
  year: string;
  doi?: string;
  month?:
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
  note?: string;
}

export interface BibTeXFields {
  [BibTeXType.Article]: KeyField &
    BasicFields &
    CommonOptional & {
      author: string;
      journal: string;
      issn?: string;
      number?: string;
      pages?: string;
      volume?: string;
    };
  [BibTeXType.Book]: KeyField &
    BasicFields &
    CommonOptional & {
      author: string;
      publisher: string;
      address?: string;
      edition?: string;
      series?: string;
      volume?: string;
    };
  [BibTeXType.Booklet]: KeyField &
    BasicFields &
    CommonOptional & {
      author: string;
      howpublished: string;
      address?: string;
      editor?: string;
      number?: string;
      organization?: string;
      series?: string;
      volume?: string;
    };
  [BibTeXType.InBook]: KeyField &
    BasicFields &
    CommonOptional & {
      author: string;
      booktitle: string;
      chapter: string;
      publisher: string;
      address?: string;
      edition?: string;
      editor?: string;
      number?: string;
      pages?: string;
      series?: string;
      volume?: string;
    };
  [BibTeXType.InCollection]: KeyField &
    BasicFields &
    CommonOptional & {
      author: string;
      booktitle: string;
      publisher: string;
      address?: string;
      chapter?: string;
      editor?: string;
      number?: string;
      pages?: string;
      series?: string;
      volume?: string;
    };
  [BibTeXType.InProceedings]: KeyField &
    BasicFields &
    CommonOptional & {
      author: string;
      booktitle: string;
      address?: string;
      editor?: string;
      number?: string;
      organization?: string;
      pages?: string;
      publisher?: string;
      series?: string;
      volume?: string;
    };
  [BibTeXType.Manual]: KeyField &
    BasicFields &
    CommonOptional & {
      author?: string;
      organization?: string;
      address?: string;
      edition?: string;
    };
  [BibTeXType.MastersThesis]: KeyField &
    BasicFields &
    CommonOptional & {
      author: string;
      school: string;
      address?: string;
      type?: string;
    };
  [BibTeXType.Misc]: KeyField &
    CommonOptional & {
      author?: string;
      title?: string;
      howpublished?: string;
      year?: string;
      note?: string;
    };
  [BibTeXType.PhdThesis]: KeyField &
    BasicFields &
    CommonOptional & {
      author: string;
      school: string;
      address?: string;
      type?: string;
    };
  [BibTeXType.Proceedings]: KeyField &
    BasicFields &
    CommonOptional & {
      editor?: string;
      volume?: string;
      number?: string;
      series?: string;
      address?: string;
      publisher?: string;
    };
  [BibTeXType.TechReport]: KeyField &
    BasicFields &
    CommonOptional & {
      author: string;
      institution: string;
      number?: string;
      address?: string;
      type?: string;
    };
  [BibTeXType.Unpublished]: KeyField &
    CommonOptional & {
      author: string;
      title: string;
      note: string;
      month?: string;
      year?: string;
    };
}

export class BibTeXEntry<T extends BibTeXType> {
  type: T;
  fields: BibTeXFields[T];

  constructor(type: T, fields: BibTeXFields[T]) {
    this.type = type;
    this.fields = fields;
  }

  toString(): string {
    const { key, ...restFields } = this.fields;

    const fieldsString = Object.entries(restFields)
      .sort()
      .map(([fieldKey, value]) => `  ${fieldKey} = {${value}}`)
      .join(',\n');

    return `@${this.type}{${key},\n${fieldsString}\n}`;
  }

  key() {
    return this.fields.key;
  }
}

export class BibTeXDatabase {
  entries: Map<string, BibTeXEntry<BibTeXType>> = new Map<
    string,
    BibTeXEntry<BibTeXType>
  >();

  add(entry: BibTeXEntry<BibTeXType>) {
    if (this.entries.has(entry.key())) {
      throw new Error(
        'Duplicate key encountered when updating BibTeX database',
      );
    }
    this.entries.set(entry.key(), entry);
  }

  toString(): string {
    let appender = '';
    this.entries.forEach((entry) => {
      appender += entry.toString() + '\n\n';
    });
    return appender;
  }
}
