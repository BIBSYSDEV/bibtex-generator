import { BibTeXDatabase, BibTeXEntry, BibTeXType } from '../src/BibTeX';
import { specFor } from './BibTeXSpec';
import { BibTeXBuilder } from './BibTeXBuilder';

describe('The BibTeX database contains BibTeX entries', () => {
  it('should allow BibTeX database creation', () => {
    const { author, key, journal, title, year } = specFor(BibTeXType.Article);
    const entry = createArticle(author, journal, key, title, year);
    const database = new BibTeXDatabase();
    database.add(entry);
    const actual = database.toString();
    const expected = new BibTeXBuilder(BibTeXType.Article)
      .setKey(key)
      .setField('author', author)
      .setField('year', year)
      .setField('journal', journal)
      .setField('title', title)
      .toString();
    expect(actual).toBe(expected);
  });

  it('should throw when duplicate key is encountered', () => {
    const { author, key, journal, title, year } = specFor(BibTeXType.Article);
    const entry = createArticle(author, journal, key, title, year);
    const database = new BibTeXDatabase();
    database.add(entry);
    expect(() => database.add(entry)).toThrow(
      'Duplicate key encountered when updating BibTeX database',
    );
  });

  it('should allow use of optional fields', () => {
    const {
      annote,
      author,
      doi,
      issn,
      journal,
      key,
      month,
      note,
      number,
      pages,
      title,
      url,
      volume,
      year,
    } = specFor(BibTeXType.Article);
    const entry = createArticle(author, journal, key, title, year);
    entry.fields.annote = annote;
    entry.fields.doi = doi;
    entry.fields.issn = issn;
    entry.fields.month = month;
    entry.fields.note = note;
    entry.fields.number = number;
    entry.fields.pages = pages;
    entry.fields.url = url;
    entry.fields.volume = volume;
    var database = new BibTeXDatabase();
    database.add(entry);
    const expected = new BibTeXBuilder(BibTeXType.Article)
      .setKey(key)
      .setField('annote', annote)
      .setField('author', author)
      .setField('doi', doi)
      .setField('issn', issn)
      .setField('journal', journal)
      .setField('month', month)
      .setField('note', note)
      .setField('number', number)
      .setField('pages', pages)
      .setField('title', title)
      .setField('url', url)
      .setField('volume', volume)
      .setField('year', year)
      .toString();
    expect(database.toString()).toBe(expected);
  });
  it('should allow creation of every type', () => {
    const database = new BibTeXDatabase();
    const { author, key, journal, title, year } = specFor(BibTeXType.Article);
    database.add(createArticle(author, journal, key, title, year));
    database.add(createBook());
    database.add(createBooklet());
    database.add(createInBook());
    database.add(createInCollection());
    database.add(createInProceedings());
    database.add(createManual());
    database.add(createMastersThesis());
    database.add(createMisc());
    database.add(createPhdThesis());
    database.add(createProceedings());
    database.add(createTechReport());
    database.add(createUnpublished());
    expect(database.entries.size).toBe(13);
  });
});

function createArticle(
  author: string,
  journal: string,
  key: string,
  title: string,
  year: string,
): BibTeXEntry<BibTeXType.Article> {
  return new BibTeXEntry(BibTeXType.Article, {
    author: author,
    journal: journal,
    key: key,
    title: title,
    year: year,
  });
}

function createBook(): BibTeXEntry<BibTeXType.Book> {
  return new BibTeXEntry(BibTeXType.Book, {
    author: 'Author, Book',
    key: 'book-0',
    publisher: 'My publisher',
    title: 'My book title',
    year: '2025',
  });
}

function createBooklet(): BibTeXEntry<BibTeXType.Booklet> {
  return new BibTeXEntry(BibTeXType.Booklet, {
    author: 'Author, Booklet',
    howpublished: 'In a booklet',
    key: 'booklet-0',
    title: 'My booklet title',
    year: '2025',
  });
}

function createInBook(): BibTeXEntry<BibTeXType.InBook> {
  return new BibTeXEntry(BibTeXType.InBook, {
    author: 'Author, In Book',
    booktitle: 'My book',
    key: 'inbook-0',
    publisher: 'My book publisher',
    title: 'My in book',
    year: '2025',
  });
}

function createInCollection(): BibTeXEntry<BibTeXType.InCollection> {
  return new BibTeXEntry(BibTeXType.InCollection, {
    author: 'Author, In Collection',
    booktitle: 'My book title',
    key: 'incollection-0',
    publisher: 'My publisher',
    title: 'My in collection title',
    year: '2025',
  });
}

function createInProceedings(): BibTeXEntry<BibTeXType.InProceedings> {
  return new BibTeXEntry(BibTeXType.InProceedings, {
    author: 'Author, In Proceedings',
    booktitle: 'My proceedings',
    key: 'inproceedings-0',
    title: 'My In Proceedings title',
    year: '2025',
  });
}

function createManual(): BibTeXEntry<BibTeXType.Manual> {
  return new BibTeXEntry(BibTeXType.Manual, {
    key: 'manual-0',
    title: 'My manual title',
    year: '2025',
  });
}

function createMastersThesis(): BibTeXEntry<BibTeXType.MastersThesis> {
  return new BibTeXEntry(BibTeXType.MastersThesis, {
    author: 'Author, Masters Thesis',
    key: 'mastersthesis-0',
    school: 'My great school',
    title: 'My masters thesis title',
    year: '2025',
  });
}

function createMisc(): BibTeXEntry<BibTeXType.Misc> {
  return new BibTeXEntry(BibTeXType.Misc, {
    key: 'misc-0',
  });
}

function createPhdThesis(): BibTeXEntry<BibTeXType.PhdThesis> {
  return new BibTeXEntry(BibTeXType.PhdThesis, {
    author: 'Author, Phd Thesis',
    key: 'phdthesis-0',
    school: 'My great school',
    title: 'My PhD Thesis title',
    year: '2025',
  });
}

function createProceedings(): BibTeXEntry<BibTeXType.Proceedings> {
  return new BibTeXEntry(BibTeXType.Proceedings, {
    key: 'proceedings-0',
    title: 'My proceedings title',
    year: '2025',
  });
}

function createTechReport(): BibTeXEntry<BibTeXType.TechReport> {
  return new BibTeXEntry(BibTeXType.TechReport, {
    author: 'Author, Technical Report',
    institution: 'My great institution',
    key: 'techreport-0',
    title: 'My tech report title',
    year: '2025',
  });
}

function createUnpublished(): BibTeXEntry<BibTeXType.Unpublished> {
  return new BibTeXEntry(BibTeXType.Unpublished, {
    author: 'Author, Unpublished',
    key: 'unpublished-0',
    note: 'Some information in a note',
    title: 'My unpublished title',
  });
}
