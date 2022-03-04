export type TIngredientType = 'bun' | 'sauce' | 'main';

export interface IIngredientData {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: string;
  count?: number;
  index: number;
}