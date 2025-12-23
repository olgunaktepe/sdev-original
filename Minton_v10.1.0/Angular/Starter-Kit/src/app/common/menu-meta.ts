export type MenuItemTypes = {
  key: string
  label: string
  isTitle?: boolean
  icon?: string
  url?: string
  badge?: {
    variant: string
    text: string
  }
  parentKey?: string
  target?: string
  children?: MenuItemTypes[]
  collapsed?: boolean
}

export const MENU: MenuItemTypes[] = [
  { key: 'navigation', label: 'Navigation', isTitle: true },
  {
    key: 'starter',
    label: 'Starter',
    icon: 'ri-terminal-window-line',
    url: '/',
    isTitle: false,
  },

  { key: 'custom', label: 'Custom', isTitle: true },
  {
    key: 'auth',
    label: 'Auth Pages',
    isTitle: false,
    icon: 'ri-shield-user-line',
    collapsed: true,
    children: [
      {
        key: 'auth-login',
        label: 'Log In',
        url: '/auth/login',
        parentKey: 'auth',
      },
      {
        key: 'auth-login-2',
        label: 'Log In 2',
        url: '/auth/login-2',
        parentKey: 'auth',
      },
      {
        key: 'auth-register',
        label: 'Register',
        url: '/auth/register',
        parentKey: 'auth',
      },
      {
        key: 'auth-register-2',
        label: 'Register 2',
        url: '/auth/register-2',
        parentKey: 'auth',
      },
      {
        key: 'auth-signin-signup',
        label: 'Signin-Signup',
        url: '/auth/signin-signup',
        parentKey: 'auth',
      },
      {
        key: 'auth-signin-signup-2',
        label: 'Signin-Signup 2',
        url: '/auth/signin-signup-2',
        parentKey: 'auth',
      },
      {
        key: 'auth-recoverpw',
        label: 'Recover Password',
        url: '/auth/recoverpw',
        parentKey: 'auth',
      },
      {
        key: 'auth-recoverpw-2',
        label: 'Recover Password 2',
        url: '/auth/recoverpw-2',
        parentKey: 'auth',
      },
      {
        key: 'auth-lock-screen',
        label: 'Lock Screen',
        url: '/auth/lock-screen',
        parentKey: 'auth',
      },
      {
        key: 'auth-lock-screen-2',
        label: 'Lock Screen 2',
        url: '/auth/lock-screen-2',
        parentKey: 'auth',
      },
      {
        key: 'auth-logout',
        label: 'Logout',
        url: '/auth/logout',
        parentKey: 'auth',
      },
      {
        key: 'auth-logout-2',
        label: 'Logout 2',
        url: '/auth/logout-2',
        parentKey: 'auth',
      },
      {
        key: 'auth-confirm-mail',
        label: 'Confirm Mail',
        url: '/auth/confirm-mail',
        parentKey: 'auth',
      },
      {
        key: 'auth-confirm-mail-2',
        label: 'Confirm Mail 2',
        url: '/auth/confirm-mail-2',
        parentKey: 'auth',
      },
    ],
  },
  {
    key: 'extra-pages',
    label: 'Extra Pages',
    isTitle: false,
    icon: 'ri-pages-line',
    collapsed: true,
    children: [
      {
        key: 'page-maintenance',
        label: 'Maintenance',
        url: '/pages/maintenance',
        parentKey: 'extra-pages',
      },
      {
        key: 'page-error-404',
        label: 'Error - 404',
        url: '/pages/404',
        parentKey: 'extra-pages',
      },
      {
        key: 'page-error-404-alt',
        label: 'Error - 404-alt',
        url: '/pages/404-alt',
        parentKey: 'extra-pages',
      },
      {
        key: 'page-error-500',
        label: 'Error - 500',
        url: '/pages/500',
        parentKey: 'extra-pages',
      },
    ],
  },
  { key: 'components', label: 'Components', isTitle: true },
  {
    key: 'multi-level',
    label: 'Multi Level',
    isTitle: false,
    icon: 'ri-share-line',
    collapsed: true,
    children: [
      {
        key: 'second-level',
        label: 'Second Level',
        parentKey: 'multi-level',
        collapsed: true,
        children: [
          {
            key: 'item-1',
            label: 'Item 1',
            parentKey: 'second-level',
          },
          {
            key: 'item-2',
            label: 'Item 2',
            parentKey: 'second-level',
          },
        ],
      },
      {
        key: 'third-level',
        label: 'Third Level',
        parentKey: 'multi-level',
        collapsed: true,
        children: [
          {
            key: 'item-1',
            label: 'Item 1',
            parentKey: 'third-level',
          },
          {
            key: 'item-2',
            label: 'Item 2',
            parentKey: 'third-level',
            collapsed: true,
            children: [
              {
                key: 'item-1',
                label: 'Item 1',
                parentKey: 'menu-levels-1-1',
              },
              {
                key: 'item-2',
                label: 'Item 2',
                parentKey: 'menu-levels-1-1',
              },
            ],
          },
        ],
      },
    ],
  },
]

export const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: 'index',
    icon: 'ri-terminal-window-line',
    label: 'Starter',
    isTitle: true,
    children: [
      {
        key: 'starter',
        label: 'Starter',
        url: '/',
        parentKey: 'index',
      },
    ],
  },

  {
    key: 'pages',
    icon: 'ri-pages-line',
    label: 'Pages',
    isTitle: true,
    children: [
      {
        key: 'auth-1',
        label: 'Auth Style 1',
        isTitle: false,
        parentKey: 'pages',
        children: [
          {
            key: 'auth-login',
            label: 'Log In',
            url: '/auth/login',
            parentKey: 'auth',
          },
          {
            key: 'auth-register',
            label: 'Register',
            url: '/auth/register',
            parentKey: 'auth',
          },
          {
            key: 'auth-signin-signup',
            label: 'Signin-Signup',
            url: '/auth/signin-signup',
            parentKey: 'auth',
          },
          {
            key: 'auth-recoverpw',
            label: 'Recover Password',
            url: '/auth/recoverpw',
            parentKey: 'auth',
          },
          {
            key: 'auth-lock-screen',
            label: 'Lock Screen',
            url: '/auth/lock-screen',
            parentKey: 'auth',
          },
          {
            key: 'auth-logout',
            label: 'Logout',
            url: '/auth/logout',
            parentKey: 'auth',
          },
          {
            key: 'auth-confirm-mail',
            label: 'Confirm Mail',
            url: '/auth/confirm-mail',
            parentKey: 'auth',
          },
        ],
      },
      {
        key: 'auth-2',
        label: 'Auth Style 2',
        isTitle: false,
        parentKey: 'pages',
        children: [
          {
            key: 'auth-login-2',
            label: 'Log In 2',
            url: '/auth/login-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-register-2',
            label: 'Register 2',
            url: '/auth/register-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-signin-signup-2',
            label: 'Signin-Signup 2',
            url: '/auth/signin-signup-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-recoverpw-2',
            label: 'Recover Password 2',
            url: '/auth/recoverpw-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-lock-screen-2',
            label: 'Lock Screen 2',
            url: '/auth/lock-screen-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-logout-2',
            label: 'Logout 2',
            url: '/auth/logout-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-confirm-mail-2',
            label: 'Confirm Mail 2',
            url: '/auth/confirm-mail-2',
            parentKey: 'auth',
          },
        ],
      },
      {
        key: 'error-pages',
        label: 'Errors',
        isTitle: false,
        parentKey: 'pages',
        children: [
          {
            key: 'page-error-404',
            label: 'Error - 404',
            url: '/pages/404',
            parentKey: 'extra-pages',
          },
          {
            key: 'page-error-404-alt',
            label: 'Error - 404-alt',
            url: '/pages/404-alt',
            parentKey: 'extra-pages',
          },
          {
            key: 'page-error-500',
            label: 'Error - 500',
            url: '/pages/500',
            parentKey: 'extra-pages',
          },
        ],
      },
      {
        key: 'extra-pages',
        label: 'Utility',
        isTitle: false,
        parentKey: 'pages',
        children: [
          {
            key: 'page-maintenance',
            label: 'Maintenance',
            url: '/pages/maintenance',
            parentKey: 'extra-pages',
          },
        ],
      },
    ],
  },
]

export const TWO_COl_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: 'index',
    icon: 'ri-terminal-window-line',
    label: 'Starter',
    isTitle: true,
    children: [
      {
        key: 'starter',
        label: 'Starter',
        url: '/',
        parentKey: 'index',
      },
    ],
  },
  {
    key: 'extra-pages',
    icon: 'ri-pages-line',
    label: 'Pages',
    isTitle: true,
    children: [
      {
        key: 'page-maintenance',
        label: 'Maintenance',
        url: '/maintenance',
        parentKey: 'extra-pages',
      },
      {
        key: 'auth',
        label: 'Auth Pages',
        isTitle: false,
        icon: 'ri-shield-user-line',
        collapsed: true,
        children: [
          {
            key: 'auth-login',
            label: 'Log In',
            url: '/auth/login',
            parentKey: 'auth',
          },
          {
            key: 'auth-login-2',
            label: 'Log In 2',
            url: '/auth/login-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-register',
            label: 'Register',
            url: '/auth/register',
            parentKey: 'auth',
          },
          {
            key: 'auth-register-2',
            label: 'Register 2',
            url: '/auth/register-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-signin-signup',
            label: 'Signin-Signup',
            url: '/auth/signin-signup',
            parentKey: 'auth',
          },
          {
            key: 'auth-signin-signup-2',
            label: 'Signin-Signup 2',
            url: '/auth/signin-signup-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-recoverpw',
            label: 'Recover Password',
            url: '/auth/recoverpw',
            parentKey: 'auth',
          },
          {
            key: 'auth-recoverpw-2',
            label: 'Recover Password 2',
            url: '/auth/recoverpw-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-lock-screen',
            label: 'Lock Screen',
            url: '/auth/lock-screen',
            parentKey: 'auth',
          },
          {
            key: 'auth-lock-screen-2',
            label: 'Lock Screen 2',
            url: '/auth/lock-screen-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-logout',
            label: 'Logout',
            url: '/auth/logout',
            parentKey: 'auth',
          },
          {
            key: 'auth-logout-2',
            label: 'Logout 2',
            url: '/auth/logout-2',
            parentKey: 'auth',
          },
          {
            key: 'auth-confirm-mail',
            label: 'Confirm Mail',
            url: '/auth/confirm-mail',
            parentKey: 'auth',
          },
          {
            key: 'auth-confirm-mail-2',
            label: 'Confirm Mail 2',
            url: '/auth/confirm-mail-2',
            parentKey: 'auth',
          },
        ],
      },
      {
        key: 'error-pages',
        label: 'Error Pages',
        isTitle: false,
        icon: 'ri-bug-line',
        parentKey: 'extra-pages',
        collapsed: true,
        children: [
          {
            key: 'page-error-404',
            label: 'Error - 404',
            url: '/pages/404',
            parentKey: 'error-pages',
          },
          {
            key: 'page-error-404-alt',
            label: 'Error - 404-alt',
            url: '/pages/404-alt',
            parentKey: 'error-pages',
          },
          {
            key: 'page-error-500',
            label: 'Error - 500',
            url: '/pages/500',
            parentKey: 'error-pages',
          },
        ],
      },
    ],
  },
  {
    key: 'components',
    icon: 'ri-stack-line',
    label: 'Components',
    isTitle: true,
    children: [
      {
        key: 'multi-level',
        label: 'Multi Level',
        isTitle: false,
        icon: 'ri-share-line',
        collapsed: true,
        children: [
          {
            key: 'second-level',
            label: 'Second Level',
            parentKey: 'multi-level',
            collapsed: true,
            children: [
              {
                key: 'item-1',
                label: 'Item 1',
                parentKey: 'second-level',
              },
              {
                key: 'item-2',
                label: 'Item 2',
                parentKey: 'second-level',
              },
            ],
          },
          {
            key: 'third-level',
            label: 'Third Level',
            parentKey: 'multi-level',
            collapsed: true,
            children: [
              {
                key: 'item-1',
                label: 'Item 1',
                parentKey: 'third-level',
              },
              {
                key: 'item-2',
                label: 'Item 2',
                parentKey: 'third-level',
                collapsed: true,
                children: [
                  {
                    key: 'item-1',
                    label: 'Item 1',
                    parentKey: 'menu-levels-1-1',
                  },
                  {
                    key: 'item-2',
                    label: 'Item 2',
                    parentKey: 'menu-levels-1-1',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
