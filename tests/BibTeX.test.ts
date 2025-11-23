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

  it('should allow use of optional fields', () => {
    const entry = new BibTeXEntry(BibTeXType.Article, {
      key: 'smith2025',
      author: 'Smith, Kim',
      title: 'The source of the C-Root',
      year: '2025',
      journal: 'Journal of studies',
      volume: '10',
      number: '2',
      issn: '1234-123X',
      month: 'jan',
      url: 'https://example.org/journal/1234-123X/2025/10/2/smith',
      note: 'Not a real thing, just an example',
      doi: '10.NNNN/1234123X.10.2.smith.2025',
      pages: '11-55',
    });
    const expected = `@article{smith2025,
  author = {Smith, Kim},
  title = {The source of the C-Root},
  year = {2025},
  journal = {Journal of studies},
  volume = {10},
  number = {2},
  issn = {1234-123X},
  month = {jan},
  url = {https://example.org/journal/1234-123X/2025/10/2/smith},
  note = {Not a real thing, just an example},
  doi = {10.NNNN/1234123X.10.2.smith.2025},
  pages = {11-55}
}`;
    expect(entry.toString()).toBe(expected);
  });
});
