export interface NotificationItem {
  id: number
  text: string
  subText: string
  icon?: string
  avatar?: string
  bgColor?: string
}

export interface ProfileMenuItem {
  label: string
  icon: string
  badge?: { variant: string; text: string }
  redirectTo: string
}

export function splitArray(array: any[], chunk_size: number) {
  const results = []
  while (array.length) {
    results.push(array.splice(0, chunk_size))
  }
  return results
}

export const Languages = [
  {
    name: 'German',
    flag: 'assets/images/flags/germany.jpg',
  },
  {
    name: 'Italian',
    flag: 'assets/images/flags/italy.jpg',
  },
  {
    name: 'Spanish',
    flag: 'assets/images/flags/spain.jpg',
  },
  {
    name: 'Russian',
    flag: 'assets/images/flags/russia.jpg',
  },
]

export const Apps = [
  {
    name: 'GitHub',
    icon: 'assets/images/brands/github.png',
    redirectTo: '#',
  },
  {
    name: 'Dribbble',
    icon: 'assets/images/brands/dribbble.png',
    redirectTo: '#',
  },
  {
    name: 'Slack',
    icon: 'assets/images/brands/slack.png',
    redirectTo: '#',
  },
  {
    name: 'G Suite',
    icon: 'assets/images/brands/g-suite.png',
    redirectTo: '#',
  },
  {
    name: 'Bitbucket',
    icon: 'assets/images/brands/bitbucket.png',
    redirectTo: '#',
  },
  {
    name: 'Dropbox',
    icon: 'assets/images/brands/dropbox.png',
    redirectTo: '#',
  },
]

export const Notifications: NotificationItem[] = [
  {
    id: 1,
    text: 'Doug Dukes commented on Admin Dashboard',
    subText: '1 min ago',
    icon: 'mdi mdi-comment-account-outline',
    bgColor: 'primary',
  },
  {
    id: 2,
    text: 'Mario Drummond',
    subText: 'Hi, How are you? What about our next meeting',
    avatar: 'assets/images/users/avatar-2.jpg',
  },
  {
    id: 3,
    text: 'Karen Robinson',
    subText: 'Wow ! this admin looks good and awesome design',
    avatar: 'assets/images/users/avatar-4.jpg',
  },
  {
    id: 4,
    text: 'New user registered.',
    subText: '5 hours ago',
    icon: 'mdi mdi-account-plus',
    bgColor: 'warning',
  },
  {
    id: 5,
    text: 'Caleb Flakelar commented on Admin',
    subText: '1 min ago',
    icon: 'mdi mdi-comment-account-outline',
    bgColor: 'info',
  },
  {
    id: 6,
    text: 'Carlos Crouch liked Admin',
    subText: '13 days ago',
    icon: 'mdi mdi-heart',
    bgColor: 'secondary',
  },
]

// get the profilemenu
export const ProfileMenus: ProfileMenuItem[] = [
  {
    label: 'My Account',
    icon: 'ri-account-circle-line',
    redirectTo: '#',
  },
  {
    label: 'Settings',
    icon: 'ri-settings-3-line',
    redirectTo: '#',
  },
  {
    label: 'My Wallet',
    icon: 'ri-wallet-line',
    badge: { variant: 'success', text: '3' },
    redirectTo: '#',
  },
  {
    label: 'Lock Screen',
    icon: 'ri-lock-line',
    redirectTo: '/auth/lock-screen',
  },
  {
    label: 'Logout',
    icon: 'ri-logout-box-line',
    redirectTo: '/auth/logout',
  },
]

export const otherOptions = [
  {
    id: 1,
    label: 'New Projects',
    icon: 'fe-briefcase',
  },
  {
    id: 2,
    label: 'Create Users',
    icon: 'fe-user',
  },
  {
    id: 3,
    label: 'Revenue Report',
    icon: 'fe-bar-chart-line-',
  },
  {
    id: 4,
    label: 'Settings',
    icon: 'fe-settings',
  },
  {
    id: 4,
    label: 'Help & Support',
    icon: 'fe-headphones',
  },
]

// get mega-menu options
export const MegaMenuOptions = [
  {
    id: 1,
    title: 'UI Components',
    menuItems: [
      'Widgets',
      'Nestable List',
      'Range Sliders',
      'Masonry Items',
      'Sweet Alerts',
      'Treeview Page',
      'Tour Page',
    ],
  },
  {
    id: 2,
    title: 'Applications',
    menuItems: [
      'eCommerce Pages',
      'CRM Pages',
      'Email',
      'Calendar',
      'Team Contacts',
      'Task Board',
      'Email Templates',
    ],
  },
  {
    id: 3,
    title: 'Extra Pages',
    menuItems: [
      'Left Sidebar with User',
      'Menu Collapsed',
      'Small Left Sidebar',
      'New Header Style',
      'Search Result',
      'Gallery Pages',
      'Maintenance & Coming Soon',
    ],
  },
]
