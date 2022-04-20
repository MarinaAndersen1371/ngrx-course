import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product, Pagination } from '../resources/product';
import * as ProductActions from './product.actions';

export const productsFeatureKey = 'products';

export interface State extends EntityState<Product> {
  // additional entities state properties
  pagination: Pagination;
  error: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();
// sortComparer: sortByName,
//selectId: selectProductId

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  pagination: null,
  error: null,
});

export const reducer = createReducer(
  initialState,

  on(ProductActions.loadProductsSuccess, (state, action) =>
    adapter.setAll(action.paginatedResult.result, {
      ...state,
      pagination: action.paginatedResult.pagination,
    })
  ),

  /****************************************************************** */
  /*****LOAD INDIVIDUAL PRODUCT ** */
  /****************************************************************** */
  on(
    ProductActions.loadProductSuccess,
    ProductActions.addProductSuccess,
    (state, action) => adapter.addOne(action.product, state)
  ),

  on(ProductActions.upsertProductSuccess, (state, action) =>
    adapter.upsertOne(action.product, state)
  ),

  on(ProductActions.clearProducts, (state) => adapter.removeAll(state)),

  on(
    ProductActions.upsertProductFailure,
    ProductActions.loadProductsFailure,
    ProductActions.addProductFailure,
    ProductActions.loadProductFailure,
    ProductActions.deleteProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),

  on(
    ProductActions.deleteProduct,
    ProductActions.deleteItemProduct,
    (state, action) => adapter.removeOne(action.productId, state)
  )
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
