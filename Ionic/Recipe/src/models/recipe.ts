import { Ingredient } from './ingredient';

export class Recipe {
  constructor(public title: string,
              public instructions: string,
              public difficulty: string,
              public ingredients: Ingredient[]) {}
}
