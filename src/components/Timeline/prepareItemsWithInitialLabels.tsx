import dayjs from 'dayjs'
import { PriorityLevel } from '../../types/PriorityTypes'

interface Item {
  date: Date
  type: 'LABEL' | 'CURRENT_DAY_LABEL'
  description: string
  priority: PriorityLevel
}

const prepareItemsWithInitialLabels = (items: Item[], currentDay: Date): Item[] => {
  if (items.length === 0) return []

  currentDay = new Date(currentDay.setHours(0, 0, 0, 0))

  const normalizedItems = items.map(item => ({
    ...item,
    date: new Date(new Date(item.date).setHours(0, 0, 0, 0))
  }))

  const preparedItems: Item[] = [
    {
      date: normalizedItems[0].date,
      type: 'LABEL',
      description: dayjs(normalizedItems[0].date).format('MMMM YYYY'),
      priority: normalizedItems[0].priority
    }
  ]

  for (let i = 0; i < normalizedItems.length; i++) {
    const item = normalizedItems[i]
    const nextItem = normalizedItems[i + 1]

    const entries: Item[] = [item]

    if (nextItem) {
      if (
        item.date.getTime() <= currentDay.getTime() &&
        nextItem.date.getTime() > currentDay.getTime()
      ) {
        const daysUntilNextItem = Math.round(
          (nextItem.date.getTime() - currentDay.getTime()) / (1000 * 60 * 60 * 24)
        )
        entries.push({
          date: new Date(currentDay),
          type: 'CURRENT_DAY_LABEL',
          description: `${daysUntilNextItem} days until next obligation`,
          priority: nextItem.priority
        })
      }

      if (new Date(item.date).getMonth() !== new Date(nextItem.date).getMonth()) {
        entries.push({
          date: nextItem.date,
          type: 'LABEL',
          description: dayjs(nextItem.date).format('MMMM YYYY'),
          priority: nextItem.priority
        })
      }
    }

    preparedItems.push(...entries)
  }

  return preparedItems
}

export default prepareItemsWithInitialLabels
