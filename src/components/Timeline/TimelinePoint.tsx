import React from 'react';
import PriorityIndicator from './TimelinePoint.styles';
import { PriorityLevel } from '../../types/PriorityTypes';
import { capitalizeFirstLetter, getPriorityColor } from '../../utils';

interface TimelinePointProps {
  priority: PriorityLevel;
  isPast: boolean;
}

const TimelinePoint: React.FC<TimelinePointProps> = ({ priority, isPast }) => {
  const bgColor = getPriorityColor(priority);
  const formattedPriority = capitalizeFirstLetter(priority.toLowerCase());

  return <PriorityIndicator isPast={isPast} bgColor={bgColor} priority={formattedPriority} />;
};

export default TimelinePoint;
