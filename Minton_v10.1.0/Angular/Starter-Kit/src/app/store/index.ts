import { ActionReducerMap } from '@ngrx/store'
import { LayoutState, layoutReducer } from './layout/layout-reducer'

export interface RootReducerState {
  layout: LayoutState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer
}
