# BibTeX generator

A simple, opinionated Typescript API for BibTeX Databases. [More information](https://github.com/BIBSYSDEV/bibtex-generator/wiki).

```Typescript
const database = new BibTeXDatabase();
const article = new BibTeXEntry(BibTeXType.Article, {
    key: 'key0',
    author: 'My Author',
    title: 'My title',
    year: '2025',
    journal: 'Journal of Studies',
});
database.add(article);
console.log(database.toString());
```

**Output:**

```^^TeX
@article{key0,
  author = {My Author},
  journal = {Journal of Studies},
  title = {My title},
  year = {2025}
}

```
