import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as ProductReducer from './product.reducer';
import * as ProductModel from '../resources/product';

export const selectProductsState = createFeatureSelector<ProductReducer.State>(
  ProductReducer.productsFeatureKey
);

export const selectAllProducts = createSelector(
  selectProductsState,
  ProductReducer.selectAll
);

export const selectPagination = createSelector(
  selectProductsState,
  (state: ProductReducer.State) => state.pagination
);

//Select all Entities
export const selectAllEntities = createSelector(
  selectProductsState,
  ProductReducer.selectEntities
);

/********************************************************************************* */
/****RETURN PRODUCTS VIEW MODEL */
/********************************************************************************* */

export interface ProductsViewModel {
  pagination: ProductModel.Pagination;
  products: ProductModel.Product[];
}

export const selectProductsViewModel = createSelector(
  selectPagination,
  selectAllProducts,
  (
    pagination: ProductModel.Pagination,
    products: ProductModel.Product[]
  ): ProductsViewModel => {
    return {
      pagination: pagination,
      products: products,
    };
  }
);

//Check if Entity is in store by id
export const entityExists = createSelector(
  selectAllEntities,
  (entities, props): boolean => {
    return entities[props.id] == undefined ? false : true;
  }
);

//Get Entity by id

export const selectEntityById = createSelector(
  selectAllEntities,
  (entities, props) => entities[props.id]
);
