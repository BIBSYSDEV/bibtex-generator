# BibTeX generator

## What it does: 

Typescript generation of BibTeX Databases.

Supported types:
  - article
  - book
  - booklet
  - inbook
  - incollection
  - inproceedings
  - manual
  - mastersthesis
  - misc
  - phdthesis
  - proceedings
  - techreport
  - unpublished

Enforces required fields and optional fields, including non-standard field "url".

## How to use it:

```Typescript
    const database = new BibTeXDatabase();
    const article = new BibTeXEntry(BibTeXType.Article, {
      key: 'key0',
      author: 'My Author',
      title: 'My title',
      year: '2025',
      journal: 'Journal of Studies',
    });
    console.log(database.toString());
```

Outputs:

```
@article{key0,
  author = {My Author},
  title = {My title},
  year = {2025},
  journal = {Journal of Studies}
}

```



