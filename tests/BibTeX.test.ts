import { BibTeXDatabase, BibTeXEntry, BibTeXType } from '../src/BibTeX';

function createArticle(): BibTeXEntry<BibTeXType.Article> {
  return new BibTeXEntry(BibTeXType.Article, {
    key: 'key0',
    author: 'My Author',
    title: 'My title',
    year: '2025',
    journal: 'Journal of Studies',
  });
}

describe('The BibTeX database contains BibTeX entries', () => {
  it('should allow BibTeX database creation', () => {
    const entry = createArticle();
    const database = new BibTeXDatabase();
    database.add(entry);
    const actual = database.toString();
    const expected = `@article{key0,
  author = {My Author},
  title = {My title},
  year = {2025},
  journal = {Journal of Studies}
}

`;
    expect(actual).toBe(expected);
  });

  it('should throw when duplicate key is encountered', () => {
    const entry = createArticle();
    const database = new BibTeXDatabase();
    database.add(entry);
    expect(() => database.add(entry)).toThrow(
      'Duplicate key encountered when updating BibTeX database',
    );
  });
});
