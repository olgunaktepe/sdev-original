// images
const avatar2 = 'assets/images/users/avatar-3.jpg'
const avatar3 = 'assets/images/users/avatar-4.jpg'
const avatar4 = 'assets/images/users/avatar-5.jpg'
const avatar5 = 'assets/images/users/avatar-6.jpg'
const avatar6 = 'assets/images/users/avatar-7.jpg'
const avatar7 = 'assets/images/users/avatar-8.jpg'

export interface ContactsItemTypes {
  id: number
  name: string
  avatar?: string
  position: string
  website: string
}

const contacts: ContactsItemTypes[] = [
  {
    id: 1,
    name: 'Denver Barker',
    avatar: avatar2,
    position: 'Founder',
    website: 'websitename.com',
  },
  {
    id: 2,
    name: 'Robert McBride',
    position: 'Webdesigner',
    website: 'abcweb.com',
  },
  {
    id: 3,
    name: 'Peter White',
    avatar: avatar3,
    position: 'Webdesigner',
    website: 'mywebs.com',
  },
  {
    id: 4,
    name: 'Ronald Myrick',
    avatar: avatar4,
    position: 'Director',
    website: 'profileq.com',
  },
  {
    id: 5,
    name: 'Paul Halpern',
    avatar: avatar5,
    position: 'Manager',
    website: 'coolweb.com',
  },
  {
    id: 6,
    name: 'Ricky Atwell',
    avatar: avatar6,
    position: 'Programmer',
    website: 'supported.com',
  },
  {
    id: 7,
    name: 'James Richards',
    position: 'Webdeveloper',
    website: 'website.com',
  },
  {
    id: 8,
    name: 'Charles Martinez',
    avatar: avatar7,
    position: 'Webdesigner',
    website: 'dumosite.com',
  },
]

export { contacts }
