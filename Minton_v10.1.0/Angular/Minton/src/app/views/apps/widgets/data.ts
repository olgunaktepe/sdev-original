// images
const profilePic = 'assets/images/users/avatar-1.jpg'
const profilePic2 = 'assets/images/users/avatar-5.jpg'

// types

type ForecastTypes = {
  day: string
  icon: string
  temp: string
}

export type WeatherTypes = {
  id: number
  temp: string
  icon: string
  clouds: string
  windSpeed: string
  humidity: string
  variant: string
  forecast: ForecastTypes[]
}

export type MessageItemTypes = {
  id: number
  userPic?: string
  userName: string
  text: string
  postedOn: string
}

const weather: WeatherTypes[] = [
  {
    id: 1,
    temp: '32°',
    icon: 'wi wi-day-sleet',
    clouds: 'Partly cloudy',
    windSpeed: '15km/h',
    humidity: '37%',
    variant: 'info',
    forecast: [
      {
        day: 'SAT',
        icon: 'wi wi-night-alt-cloudy',
        temp: '30',
      },
      {
        day: 'SUN',
        icon: 'wi wi-day-sprinkle',
        temp: '28',
      },
      {
        day: 'MON',
        icon: 'wi wi-hot',
        temp: '33',
      },
    ],
  },
  {
    id: 2,
    temp: '18°',
    icon: 'wi wi-night-sprinkle',
    clouds: 'Partly cloudy',
    windSpeed: '15km/h',
    humidity: '37%',
    variant: 'success',
    forecast: [
      {
        day: 'SAT',
        icon: 'wi wi-day-sprinkle',
        temp: '30',
      },
      {
        day: 'SUN',
        icon: 'wi wi-storm-showers',
        temp: '28',
      },
      {
        day: 'MON',
        icon: 'wi wi-night-alt-cloudy',
        temp: '33',
      },
    ],
  },
]

export const InboxList = [
  {
    id: 1,
    avatar: 'assets/images/users/avatar-2.jpg',
    sender: 'Tomaslau',
    text: "I've finished it! See you so...",
  },
  {
    id: 2,
    avatar: 'assets/images/users/avatar-3.jpg',
    sender: 'Stillnotdavid',
    text: 'This theme is awesome!',
  },
  {
    id: 3,
    avatar: 'assets/images/users/avatar-4.jpg',
    sender: 'Kurafire',
    text: 'Minton is awesome theme!',
  },
  {
    id: 4,
    avatar: 'assets/images/users/avatar-5.jpg',
    sender: 'Shahedk',
    text: 'This theme is awesome',
  },
  {
    id: 5,
    avatar: 'assets/images/users/avatar-6.jpg',
    sender: 'Adhamdannaway',
    text: 'Minton theme is awesome',
  },
  {
    id: 6,
    avatar: 'assets/images/users/avatar-3.jpg',
    sender: 'Stillnotdavid',
    text: 'This theme is awesome!',
  },
  {
    id: 7,
    avatar: 'assets/images/users/avatar-4.jpg',
    sender: 'Kurafire',
    text: 'Nice to meet you',
  },
]

const chatMessages: MessageItemTypes[] = [
  {
    id: 1,
    userPic: profilePic2,
    userName: 'Geneva',
    text: 'Hello!',
    postedOn: '10:00',
  },
  {
    id: 2,
    userPic: profilePic,
    userName: 'Dominic',
    text: 'Hi, How are you? What about our next meeting?',
    postedOn: '10:01',
  },
  {
    id: 3,
    userPic: profilePic2,
    userName: 'Geneva',
    text: 'Yeah everything is fine',
    postedOn: '10:02',
  },
  {
    id: 4,
    userPic: profilePic,
    userName: 'Dominic',
    text: "Wow that's great!",
    postedOn: '10:03',
  },
  {
    id: 5,
    userPic: profilePic2,
    userName: 'Geneva',
    text: 'Cool!',
    postedOn: '10:03',
  },
]

export { weather, chatMessages }
