import React from 'react'
import styled from 'styled-components'
import * as dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

interface PriorityProps {
  priority: 'HIGH' | 'MODERATE' | 'LOW'
  isPast?: boolean
}

const PriorityIndicator = styled.div<{ bgColor: string; priority; isPast: boolean }>`
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 5px solid white;
  background-color: ${props => props.bgColor};
  ${props => props.isPast && 'background-color: rgb(240, 242, 245);'}
  position: relative;
  z-index: 11;
  transition: transform 0.1s ease-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &:hover::before,
  &:hover::after {
    visibility: visible;
    opacity: 1;
  }

  &::before,
  &::after {
    content: '';
    opacity: 0;
    visibility: hidden;
    transition:
      visibility 0.2s linear 0s,
      opacity 0.1s ease-out,
      transform 0.1s ease-out;
    position: absolute;
    background-color: ${props => props.bgColor};
  }

  &::before {
    top: -14px;
    left: 2px;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    transform: rotate(45deg);
  }

  &::after {
    content: '${props => props.priority} Priority';
    font-weight: 500;
    font-size: 0.7em;
    top: -32px;
    color: white;
    padding: 5px;
    text-align: center;
    border-radius: 5px;
    white-space: nowrap;
    left: 50%;
    transform: translateX(-50%);
    z-index: 12;
  }
`

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const Priority: React.FC<PriorityProps> = ({ priority, isPast }) => {
  const getPriorityColor = (priority: 'HIGH' | 'MODERATE' | 'LOW') => {
    switch (priority) {
      case 'HIGH':
        return '#ff6361'
      case 'MODERATE':
        return '#ffd700'
      case 'LOW':
        return '#003f5c'
      default:
        return '#003f5c' // Default color if no priority is matched
    }
  }

  const bgColor = getPriorityColor(priority)
  const formattedPriority = capitalizeFirstLetter(priority.toLowerCase()) // Format the priority text

  return <PriorityIndicator isPast={isPast} bgColor={bgColor} priority={formattedPriority} />
}

const InfoButton = () => {
  return (
    <svg
      stroke="#000"
      fill="#000"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
    </svg>
  )
}

const prepareItemsWithInitialLabels = (items, currentDay) => {
  const preparedItems = []

  currentDay.setHours(0, 0, 0, 0) // Normalize current day to start of day

  if (items.length > 0) {
    const firstItemDate = new Date(items[0].date)
    firstItemDate.setHours(0, 0, 0, 0) // Normalize first item date to start of day

    // Initially, add a label for the first item's month and year
    preparedItems.push({
      date: items[0].date,
      type: 'LABEL',
      description: `${dayjs(firstItemDate).format('MMMM YYYY')}`
    })

    items.forEach((item, index, array) => {
      // Normalize item date to start of day for comparison
      const itemDate = new Date(item.date)
      itemDate.setHours(0, 0, 0, 0)

      // Add the current item
      preparedItems.push(item)

      const nextItem = array[index + 1]
      if (nextItem) {
        const nextDate = new Date(nextItem.date)
        nextDate.setHours(0, 0, 0, 0) // Normalize next item date to start of day

        // Check if the current item is before the current day and the next item is after the current day
        if (itemDate <= currentDay && nextDate > currentDay) {
          // Calculate days until the next period
          const daysUntilNextItem = Math.round((nextDate - currentDay) / (1000 * 60 * 60 * 24))

          // Insert a label for the current day
          preparedItems.push({
            date: currentDay.toISOString(),
            type: 'CURRENT_DAY_LABEL',
            description: `${daysUntilNextItem} days until next obligation`
          })
        }

        // Check for month change and insert a month label
        if (itemDate.getMonth() !== nextDate.getMonth()) {
          preparedItems.push({
            date: nextItem.date,
            type: 'LABEL',
            description: `${dayjs(nextItem.date).format('MMMM YYYY')}`
          })
        }
      }
    })
  }

  return preparedItems
}

export const Timeline = ({ items }) => {
  const currentDay = new Date()
  currentDay.setHours(0, 0, 0, 0)

  const preparedItems = prepareItemsWithInitialLabels(items, currentDay)

  // Find the index of the last item that is in the past
  const lastPastItemIndex = preparedItems.reduce((lastIndex, item, index) => {
    const itemDate = new Date(item.date)
    itemDate.setHours(0, 0, 0, 0) // Normalize item date to start of day
    return itemDate < currentDay ? index : lastIndex
  }, -1)

  return (
    <TimelineContainer>
      <TimelineHeader>
        <p>Timeline</p>
        <div aria-hidden="true" style={{ flex: '1 1 0%' }}></div>
        <InfoContainer>
          <InfoButton />
          <InfoBox className="info">This is a timeline</InfoBox>
        </InfoContainer>
      </TimelineHeader>
      <div style={{ padding: '0 0 1em 0' }}>
        <TimelineFilterContainer>
          <TimelineFilter className="selected">High</TimelineFilter>
          <TimelineFilter>Moderate</TimelineFilter>
          <TimelineFilter>Low</TimelineFilter>
        </TimelineFilterContainer>
        <TimelineFilterContainer>
          <TimelineFilter>Accounting Period End</TimelineFilter>
          <TimelineFilter>VAT Period End</TimelineFilter>
          <TimelineFilter>VAT Period Reporting Due</TimelineFilter>
          <TimelineFilter>Bank Integration Renewal</TimelineFilter>
        </TimelineFilterContainer>
      </div>

      <div
        style={{ padding: '0px 1rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        {preparedItems.map((item, index) => {
          // Perform the logic outside of the return statement
          const itemDate = new Date(item.date)
          itemDate.setHours(0, 0, 0, 0) // Normalize item date to start of day for comparison
          const isPast = itemDate < currentDay
          const daysUntilItem = Math.round((itemDate - currentDay) / (1000 * 60 * 60 * 24))
          if (item.type === 'CURRENT_DAY_LABEL') {
            return (
              <div
                key={`current-daylabel-${index}`}
                style={{ display: 'flex', position: 'relative' }}
              >
                <VerticalLine className={'current'} />
                <CurrentPoint />
                <Label className={'day-label current'}>{item.description}</Label>
              </div>
            )
          }

          if (item.type === 'LABEL') {
            return (
              <div
                key={`label-${index}`}
                style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
              >
                <VerticalLine className={isPast ? 'colored' : ''} />
                <Label>{item.description}</Label>
              </div>
            )
          } else {
            return (
              <>
                <StyledItem key={`item-${index}`}>
                  <div style={{ width: '6rem', textAlign: 'right' }}>
                    {dayjs(item.date).format('Do MMM')}
                  </div>
                  <Priority priority={item.priority} isPast={isPast} />
                  <VerticalLine className={isPast ? 'colored' : ''} />
                  {index === lastPastItemIndex + 1 && <CurrentPoint />}
                  <TimelineItem className={isPast ? 'colored timeline-item' : 'timeline-item'}>
                    {item.description}
                  </TimelineItem>
                  <Label className="day-label">
                    {isPast
                      ? `obligation was ${daysUntilItem * -1} days ago`
                      : `${daysUntilItem} days until obligation`}
                  </Label>
                </StyledItem>
              </>
            )
          }
        })}
      </div>
    </TimelineContainer>
  )
}

const StyledItem = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  width: fit-content;
  &:hover {
    // & [priority] {
    //   transform: scale(1.1);
    //   &::before, &:after {
    //     visibility: visible;
    //     opacity: 1;
    //   }
    // }

    & .timeline-item {
      transform: scale(1.03);
    }
  }
`

const CurrentPoint = styled.div`
  width: 0.75em;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #1b98f5;
  position: absolute;
  left: 114px;
  top: 1px;
  border: 5px solid rgb(240, 242, 245);

  // &::before {
  //   content: "13 days until next period";
  //   white-space: nowrap;
  //   font-size: 0.875rem;
  //   padding: 0.25rem 0.5rem;
  //   border-radius: 0.5rem;
  //   color: white;
  //   background-color: #1b98f5;
  //   position: absolute;
  //   left: 35px;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   font-weight: 500;
  // }
`

const VerticalLine = styled.div`
  width: 2px;
  left: 7.75em;
  top: -0.5em;
  height: calc(100% + 1em);
  position: absolute;
  background-color: rgb(240, 242, 245);
  &.colored {
    background-color: rgb(66, 90, 112);
  }
  &.current {
    background: rgb(0, 63, 92);
    background: linear-gradient(
      180deg,
      rgba(0, 63, 92, 1) 0%,
      rgba(0, 63, 92, 1) 50%,
      rgba(240, 242, 245, 1) 50%,
      rgba(240, 242, 245, 1) 100%
    );
  }
  &.first {
    background: rgb(0, 63, 92);
    background: linear-gradient(0deg, rgba(0, 63, 92, 1) 0%, rgba(240, 242, 245, 0) 100%);
  }
`

const Label = styled.div`
  font-weight: 500;
  color: rgb(66, 90, 112);
  background: rgb(240, 242, 245);
  position: relative;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  user-select: none;
  white-space: nowrap;
  width: fit-content;
  &.day-label {
    visibility: hidden;
    opacity: 0;
    transform: scale(0.9) translateX(-25%);
    transition: all 0.1s ease-in-out;
    &.current {
      visibility: visible;
      transform: scale(1);
      opacity: 1;
      display: block;
      left: 11em;
      background: rgb(27, 152, 245);
      color: white;
      &::before {
        border-color: rgb(27, 152, 245);
        border-width: 0 0 7px 7px;
      }
    }
    &::before {
      content: '';
      position: absolute;
      border-radius: 2px;
      // background: rgb(27, 152, 245);
      border: solid rgb(27, 152, 245);
      box-sizing: border-box;
      border-width: 0;
      width: 17px;
      height: 17px;
      left: -5px;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
  }
`

const InfoContainer = styled.div`
  position: relative;
  cursor: pointer;
  & .info {
    visibility: hidden;
    width: 300px;
    transform: scale(0.75) translateX(40px);
    opacity: 0;
    transition:
      visibility 0.2s linear 0s,
      opacity 0.2s ease-out,
      transform 0.2s ease-out;
    transition-delay: 0.5s;
  }
  &:hover .info {
    visibility: visible;
    transform: scale(1);
    opacity: 1;
    transition-delay: 0s; // Reset delay to 0s when showing
  }
`

const InfoBox = styled.div`
  border-radius: 1rem;
  position: absolute;
  right: 0;
  background: #252e38;
  color: white;
  padding: 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
`

const TimelineContainer = styled.div`
  border-radius: 1rem;
  background: white;
  font-family: Montserrat, sans-serif;
`

const TimelineHeader = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 1rem;
  min-height: 3.5rem;
  border-bottom: 1px solid rgb(240, 242, 245);
  margin-bottom: 1rem;
  font-weight: 500;
`

const TimelineItem = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 1rem;
  min-height: 3.5rem;
  // border-bottom: 1px solid rgb(240, 242, 245);
  border: 2px solid rgb(240, 242, 245);
  border-radius: 1rem;
  transition: transform 0.1s ease-out;
  &.colored {
    // border-color: rgb(66, 90, 112);
    background-color: rgb(240, 242, 245);
    color: rgba(66, 90, 112, 0.5);
  }
  &:hover + .day-label {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  }
`
const TimelineFilter = styled.div`
  color: rgb(66, 90, 112);
  background: rgb(240, 242, 245);
  position: relative;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  user-select: none;
  white-space: nowrap;
  transition: all 0.2s ease-out;

  &.selected {
    background: rgb(27, 152, 245);
    color: white;
  }
`

const TimelineFilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  -webkit-box-align: center;
  align-items: center;
  padding: 0px 1rem;
  margin-bottom: .5rem;
  font-weight: 500;
  font-size 14px;
  width: 100%;
  flex-wrap: wrap;
`
