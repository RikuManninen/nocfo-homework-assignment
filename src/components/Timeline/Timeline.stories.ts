import { Timeline } from './Timeline'
import timelineEvents from '../../data/timelineEvents.json'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

export default {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  }
}

export const Primary = {
  name: 'Primary - on iPhone 6',
  args: {
    items: timelineEvents
  }
}
