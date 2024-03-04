import React from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Priority from './TimelinePoint'
import InfoButton from '../InfoButton/InfoButton'
import {
  InfoContainer,
  InfoBox,
  TimelineContainer,
  TimelineHeader,
  TimelineItem,
  VerticalLine,
  CurrentPoint,
  Label,
  StyledItem,
  ItemsContainer,
  LabelContainer,
  ItemDate,
  Spacer
} from './Timeline.styles'
import prepareItemsWithInitialLabels from './prepareItemsWithInitialLabels'
import TimelineFilter from './TimelineFilter'
import { PriorityLevel } from '../../types/PriorityTypes'

dayjs.extend(advancedFormat)

interface Item {
  type: 'LABEL' | 'CURRENT_DAY_LABEL'
  date: Date
  description: string
  priority: PriorityLevel
}

interface TimelineProps {
  items: Item[]
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const currentDay = new Date()
  currentDay.setHours(0, 0, 0, 0)
  const preparedItems = prepareItemsWithInitialLabels(items, currentDay)

  return (
    <TimelineContainer>
      <TimelineHeader>
        <p>Timeline</p>
        <Spacer />
        <InfoContainer>
          <InfoButton />
          <InfoBox className="info"><p>This timeline displays key financial and operational deadlines and events for efficient planning and management.</p><p> Each entry is marked with a specific priority level; Low, Moderate, or High,indicating the urgency or importance of the event.</p></InfoBox>
        </InfoContainer>
      </TimelineHeader>
      <ItemsContainer>
        {preparedItems.map((item, index) => renderItem(item, index, currentDay))}
      </ItemsContainer>
    </TimelineContainer>
  )
}

const renderItem = (item: Item, index: number, currentDay: Date) => {
  const itemDate = new Date(item.date)
  itemDate.setHours(0, 0, 0, 0)
  const isPast = itemDate.getTime() < currentDay.getTime()
  const daysUntilItem = Math.round(
    (itemDate.getTime() - currentDay.getTime()) / (1000 * 60 * 60 * 24)
  )

  switch (item.type) {
    case 'CURRENT_DAY_LABEL':
      return <CurrentDayLabel item={item} index={index} isPast={isPast} />
    case 'LABEL':
      return <DateLabel item={item} index={index} isPast={isPast} />
    default:
      return (
        <TimelineEvent item={item} index={index} isPast={isPast} daysUntilItem={daysUntilItem} />
      )
  }
}

interface LabelProps {
  item: Item
  index: number
  isPast: boolean
}

const CurrentDayLabel: React.FC<LabelProps> = ({ item, index }) => (
  <LabelContainer key={`current-daylabel-${index}`}>
    <VerticalLine className="current" />
    <CurrentPoint />
    <Label className="day-label current">{item.description}</Label>
  </LabelContainer>
)

const DateLabel: React.FC<LabelProps> = ({ item, index, isPast }) => (
  <LabelContainer key={`label-${index}`} center={true}>
    <VerticalLine className={isPast ? 'colored' : ''} />
    <Label>{item.description}</Label>
  </LabelContainer>
)

interface TimelineEventProps extends LabelProps {
  daysUntilItem: number
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ item, index, isPast, daysUntilItem }) => (
  <StyledItem key={`item-${index}`}>
    <ItemDate>{dayjs(item.date).format('Do MMM')}</ItemDate>
    <Priority priority={item.priority} isPast={isPast} />
    <VerticalLine className={isPast ? 'colored' : ''} />
    <TimelineItem className={isPast ? 'colored timeline-item' : 'timeline-item'}>
      {item.description}
    </TimelineItem>
    <Label className="day-label">
      {isPast
        ? `obligation was ${daysUntilItem * -1} days ago`
        : `${daysUntilItem} days until obligation`}
    </Label>
  </StyledItem>
)
