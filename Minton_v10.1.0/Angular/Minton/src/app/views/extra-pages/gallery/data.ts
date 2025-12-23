// images
const user1 = 'assets/images/users/avatar-2.jpg'
const user2 = 'assets/images/users/avatar-3.jpg'
const user3 = 'assets/images/users/avatar-4.jpg'
const user4 = 'assets/images/users/avatar-5.jpg'
const user5 = 'assets/images/users/avatar-6.jpg'
const user6 = 'assets/images/users/avatar-7.jpg'
const user8 = 'assets/images/users/avatar-9.jpg'
const user9 = 'assets/images/users/avatar-10.jpg'

const img1 = 'assets/images/small/img-1.jpg'
const img2 = 'assets/images/small/img-2.jpg'
const img3 = 'assets/images/small/img-3.jpg'
const img4 = 'assets/images/small/img-4.jpg'
const img5 = 'assets/images/small/img-5.jpg'
const img6 = 'assets/images/small/img-6.jpg'
const img7 = 'assets/images/small/img-7.jpg'

export interface ImageType {
  src: string
  caption: string
  thumb: string
}

export interface GalleryItem {
  id?: number
  image: ImageType
  title?: string
  userName?: string
  avatar?: string
  isLiked?: boolean
  category?: string[]
}

const gallery: GalleryItem[] = [
  {
    id: 1,
    image: {
      src: img1,
      caption: 'Screenshot-1',
      thumb: img1,
    },
    title: 'Man wearing black jacket',
    userName: 'Justin Coke',
    avatar: user2,
    isLiked: false,
    category: ['web', 'illustrator'],
  },
  {
    id: 2,
    image: {
      src: img2,
      caption: 'Screenshot-2',
      thumb: img2,
    },
    title: 'Snow covered mountain',
    userName: 'Toni Sanchez',
    avatar: user1,
    isLiked: true,
    category: ['web', 'graphic', 'photography'],
  },
  {
    id: 3,
    image: {
      src: img3,
      caption: 'Screenshot-3',
      thumb: img3,
    },
    title: 'Woman sitting on rock',
    userName: 'Maria Crowder',
    avatar: user4,
    isLiked: false,
    category: ['web', 'illustrator', 'photography'],
  },
  {
    id: 4,
    image: {
      src: img4,
      caption: 'Screenshot-4',
      thumb: img4,
    },
    title: "Smiling woman's face",
    userName: 'Charles East',
    avatar: user5,
    isLiked: false,
    category: ['graphic', 'illustrator'],
  },
  {
    id: 5,
    image: {
      src: img5,
      caption: 'Screenshot-5',
      thumb: img5,
    },
    title: 'Brown tabby cat sitting on concrete',
    userName: 'David Buchanan',
    avatar: user6,
    isLiked: true,
    category: ['web', 'illustrator'],
  },
  {
    id: 6,
    image: {
      src: img6,
      caption: 'Screenshot-6',
      thumb: img6,
    },
    title: 'Woman walking between brown',
    userName: 'Lee Moore',
    avatar: user6,
    isLiked: true,
    category: ['graphic', 'photography'],
  },
  {
    id: 7,
    image: {
      src: img7,
      caption: 'Screenshot-7',
      thumb: img7,
    },
    title: 'Landscape photography of mountains',
    userName: 'Julia Cruz',
    avatar: user8,
    isLiked: false,
    category: ['web', 'illustrator'],
  },
  {
    id: 8,
    image: {
      src: img1,
      caption: 'Screenshot-1',
      thumb: img1,
    },
    title: 'Man wearing black jacket',
    userName: 'Craig Creek',
    avatar: user8,
    isLiked: false,
    category: ['web', 'illustrator'],
  },
  {
    id: 9,
    image: {
      src: img2,
      caption: 'Screenshot-2',
      thumb: img2,
    },
    title: 'Snow covered mountain',
    userName: 'Gloria Pitt',
    avatar: user9,
    isLiked: false,
    category: ['graphic', 'photography'],
  },
  {
    id: 10,
    image: {
      src: img3,
      caption: 'Screenshot-3',
      thumb: img3,
    },
    title: 'Woman sitting on rock',
    userName: 'Silas Seay',
    avatar: user3,
    isLiked: false,
    category: ['web', 'illustrator'],
  },
  {
    id: 11,
    image: {
      src: img4,
      caption: 'Screenshot-4',
      thumb: img4,
    },
    title: "Smiling woman's face",
    userName: 'Linda Ward',
    avatar: user4,
    isLiked: true,
    category: ['graphic', 'illustrator'],
  },
  {
    id: 12,
    image: {
      src: img5,
      caption: 'Screenshot-5',
      thumb: img5,
    },
    title: 'Brown tabby cat sitting on concrete',
    userName: 'Becky Eley',
    avatar: user5,
    isLiked: true,
    category: ['web', 'illustrator'],
  },
]

export { gallery }
