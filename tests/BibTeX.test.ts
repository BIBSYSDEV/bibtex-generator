import {BibTeXDatabase, BibTeXEntry, BibTeXType} from "../src/BibTeX";

function createArticle(): BibTeXEntry<BibTeXType.Article> {
    return new BibTeXEntry(BibTeXType.Article,
        {
            key: 'key0',
            author: 'My Author',
            title: 'My title',
            year: '2025',
            journal: 'Journal of Studies'
        });
}

describe('The BibTeX entry fields work as expected', () => {
    test.each([['01', 'jan'], ['3', 'mar'], [10, 'oct']])('should translate %i to month-string %s',
        (input, expected) => {
        const actual = new BibTeXEntry(BibTeXType.Book,
            {
                key: 'key0',
                author: 'My author',
                title: 'My title',
                year: '2025',
                publisher: 'My publisher',
                month: input // Can this be anything other than any?
            });
        expect(actual.fields.month).toBe(expected);
    });
    it('should throw when input for month is nonsense', () => {
        const month = 'Arrant nonsense';
        expect(() => new BibTeXEntry(BibTeXType.Booklet, {
            key: 'key0',
            author: 'My author',
            howpublished: 'Written on a rock',
            title: 'My title',
            year: '2021',
            month: month
        })).toThrow("Invalid month: " + month)
    });
});

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
        expect(() => database.add(entry)).toThrow("Duplicate key encountered when updating BibTeX database");
    });
});