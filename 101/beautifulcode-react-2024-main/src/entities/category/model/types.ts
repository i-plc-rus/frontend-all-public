export type Category = {
  id: string;
  budget: number;
  name: string;
};

export type CreateCategoryRequest = {
  name: string;
  budget: number;
};
