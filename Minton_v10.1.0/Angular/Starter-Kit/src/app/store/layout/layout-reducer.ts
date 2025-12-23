import { Action, createReducer, on } from '@ngrx/store'
import {
  changelayout,
  changemenucolor,
  changemenusize,
  changeposition,
  changeSidebarUser,
  changetheme,
  changetoparcolor,
  changeWidth,
  resetState,
} from './layout-action'
import {
  LAYOUT_THEME_TYPES,
  LAYOUT_MENU_COLOR,
  LAYOUT_MENU_SIZE,
  LAYOUT_WIDTH_TYPES,
  LAYOUT_POSITION_TYPES,
  LAYOUT_TOPBAR_COLOR_TYPES,
  LAYOUT_TYPES,
  SIDEBAR_USER,
} from './layout'

export interface LayoutState {
  LAYOUT: string
  LAYOUT_THEME: string
  LAYOUT_WIDTH: string
  LAYOUT_TOPBAR_COLOR: string
  LAYOUT_MENU_COLOR: string
  LAYOUT_MENU_SIZE: string
  LAYOUT_POSITION: string
  SIDEBAR_USER: boolean
}

// IntialState
export const initialState: LayoutState = {
  LAYOUT: LAYOUT_TYPES.VERTICAL,
  LAYOUT_THEME: LAYOUT_THEME_TYPES.LIGHTMODE,
  LAYOUT_WIDTH: LAYOUT_WIDTH_TYPES.FLUID,
  LAYOUT_TOPBAR_COLOR: LAYOUT_TOPBAR_COLOR_TYPES.BRAND,
  LAYOUT_MENU_COLOR: LAYOUT_MENU_COLOR.LIGHT,
  LAYOUT_MENU_SIZE: LAYOUT_MENU_SIZE.DEFAULT,
  LAYOUT_POSITION: LAYOUT_POSITION_TYPES.FIXED,
  SIDEBAR_USER: SIDEBAR_USER.FALSE,
}

export const layoutReducer = createReducer(
  initialState,
  on(changelayout, (state, action) => ({ ...state, LAYOUT: action.layout })),
  on(changetheme, (state, action) => ({
    ...state,
    LAYOUT_THEME: action.color,
  })),
  on(changeWidth, (state, action) => ({
    ...state,
    LAYOUT_WIDTH: action.width,
  })),
  on(changetoparcolor, (state, action) => ({
    ...state,
    LAYOUT_TOPBAR_COLOR: action.topbarcolor,
  })),
  on(changemenucolor, (state, action) => ({
    ...state,
    LAYOUT_MENU_COLOR: action.menucolor,
  })),
  on(changemenusize, (state, action) => ({
    ...state,
    LAYOUT_MENU_SIZE: action.menusize,
  })),
  on(changeposition, (state, action) => ({
    ...state,
    LAYOUT_POSITION: action.position,
  })),
  on(changeSidebarUser, (state, action) => ({
    ...state,
    SIDEBAR_USER: action.user,
  })),
  on(resetState, () => initialState)
)

// Selector
export function reducer(state: LayoutState | undefined, action: Action) {
  return layoutReducer(state, action)
}
