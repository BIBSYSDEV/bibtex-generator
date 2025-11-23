import { BibTeXFields, BibTeXType } from '../src/BibTeX';

export class BibTeXBuilder<T extends BibTeXType> {
  private type: T;
  private fields: Partial<BibTeXFields[T]> = {};

  constructor(type: T) {
    this.type = type;
  }

  setKey(key: string): this {
    this.fields.key = key;
    return this;
  }

  setField<K extends keyof BibTeXFields[T]>(
    field: K,
    value: BibTeXFields[T][K],
  ): this {
    this.fields[field] = value;
    return this;
  }

  toString(): string {
    if (!this.fields.key) {
      throw new Error('A key must be set before generating BibTeX output.');
    }

    const { key, ...restFields } = this.fields;

    const fieldsString = Object.entries(restFields)
      .sort()
      .filter(([value]) => value !== undefined)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([fieldKey, value]) => `  ${fieldKey} = {${value}}`)
      .join(',\n');

    return `@${this.type}{${key},\n${fieldsString}\n}\n\n`;
  }
}
