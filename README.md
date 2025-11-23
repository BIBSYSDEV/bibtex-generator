# BibTeX generator

A simple, opinionated Typescript API that allows you to create BibTeX Databases.

## TL;DR

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

```^^TeX
@article{key0,
  author = {My Author},
  title = {My title},
  year = {2025},
  journal = {Journal of Studies}
}

```

## What it does

The API forces you to create valid entries based on the entry type, by defining what is valid for each type in terms of obligatory and optional fields. 

### What is a BibTeX database?

It is a plain-text file (typically with the extension `.bib`) that contains entries of the type:

```^^TeX
@article{smith,
  author = {Smith, Kim},
  title = {The solitude of F-Sharp},
  year = {2025},
  journal = {Journal of Studies}
}
```
### What is an entry?

An entry is a bibliograph item in the database.

The aim of an entry is to form a basis for a valid citation independent of citation style.

### Assumptions

  - The output is UTF-8 (i.e. **NOT** ASCII)
  - String processing (such as escaping special characters like `ö` -> `\"o`) is done before inserting the string into the entry.
  - Everything we output is a string
    - dates can be `2025`, `ca. 1910`
    - `number`, `volume` are often observed as non-numeric (such as roman numerals) values
    - Month is an item from the provided month enum `jan`, `feb`, etc.

## Supported types

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

Since `conference` is typically viewed as the same as `inproceedings`, this has been omitted.

### Fields

| **Type**           | **Obligatory Fields**                               | **Optional Fields**                                                                                                    |
|--------------------|-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **@article**       | `author`, `journal`, `title`, `year`                | `doi`, `issn`, `month`, `note`, `number`, `pages`, `url`, `volume`                                                     |
| **@book**          | `author`, `publisher`, `title`, `year`              | `address`, `doi`, `edition`, `month`, `note`, `series`, `url`, `volume`                                                |
| **@booklet**       | `author`, `howpublished`, `title`, `year`           | `address`, `doi`, `editor`, `month`, `note`, `number`, `organization`, `series`, `url`, `volume`                       |
| **@inbook**        | `author`, `booktitle`, `publisher`, `title`, `year` | `address`, `doi`, `edition`, `editor`, `month`, `note`, `number`, `pages`, `series`, `url`, `volume`                   |
| **@incollection**  | `author`, `booktitle`, `publisher`, `title`, `year` | `address`, `doi`, `editor`, `month`, `note`, `number`, `pages`, `series`, `url`, `volume`                              |
| **@inproceedings** | `author`, `booktitle`, `title`, `year`              | `address`, `doi`, `editor`, `month`, `note`, `number`, `organization`, `pages`, `publisher`, `series`, `url`, `volume` |
| **@manual**        | `title`, `year`                                     | `address`, `author`, `doi`, `edition`, `month`, `note`, `organization`, `url`                                          |
| **@mastersthesis** | `author`, `school`, `title`, `year`                 | `address`, `doi`, `month`, `note`, `type`, `url`                                                                       |
| **@misc**          |                                                     | `author`, `howpublished`, `note`, `title`, `url`, `year`                                                               |
| **@phdthesis**     | `author`, `school`, `title`, `year`                 | `address`, `doi`, `month`, `note`, `type`, `url`                                                                       |
| **@proceedings**   | `title`, `year`                                     | `address`, `doi`, `editor`, `month`, `note`, `number`, `publisher`, `series`, `url`, `volume`                          |
| **@techreport**    | `author`, `institution`, `title`, `year`            | `address`, `doi`, `month`, `note`, `number`, `type`, `url`                                                             |
| **@unpublished**   | `author`, `note`, `title`                           | `month`, `url`, `year`                                                                                                 |
``` 
Note we include the non-standard `url` as an optional field on every type, this may be ignored by tools or styles; expressing the URL or an entry may therefore require that the URL for an entry is also expressed in e.g. `note` or `howpublisbed`.

## How to use it:

- Create a database
- Add entries to the database
  - Choose a type
  - Add the obligatory fields
  - Add the optional fields

Example:
```^^typescript
    const database = new BibTeXDatabase();
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
    console.log(database.toString())
```
Output:

```
@article{smith2025,
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
}

```

### How do I represent?

#### Bachelors theses, Licenciate theses, etc.

Typically, just add a "type" field.

```
@mastersthesis{smith2025,
  author = {Smith, Kim},
  title = {My bachelors thesis strangely given the type mastersthesis},
  year = {2025},
  school = {"School of studies"},
  type = {Bachelors thesis}
}
```

