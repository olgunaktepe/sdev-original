import { EventInput } from '@fullcalendar/core'

export type externalModel = {
  id: number
  className: string
  title: string
}

const defaultEvents: EventInput[] = [
  {
    id: '1',
    title: 'Meeting with Mr. Shreyu',
    start: new Date(Date.now() + 158000000),
    end: new Date(Date.now() + 338000000),
    className: 'bg-warning',
  },
  {
    id: '2',
    title: 'Interview - Backend Engineer',
    start: new Date(),
    end: new Date(),
    className: 'bg-success',
  },
  {
    id: '3',
    title: 'Phone Screen - Frontend Engineer',
    start: new Date(Date.now() + 168000000),
    className: 'bg-info',
  },
  {
    id: '4',
    title: 'Buy Design Assets',
    start: new Date(Date.now() + 338000000),
    end: new Date(Date.now() + 338000000 * 1.2),
    className: 'bg-primary',
  },
]

// external events
const externalEvents: externalModel[] = [
  {
    id: 1,
    className: 'success',
    title: 'New Theme Release',
  },
  {
    id: 2,
    className: 'info',
    title: 'My Event',
  },
  {
    id: 3,
    className: 'warning',
    title: 'Meet manager',
  },
  {
    id: 4,
    className: 'danger',
    title: 'Create New theme',
  },
]

export { defaultEvents, externalEvents }
