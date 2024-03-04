import { PriorityLevel } from './types/PriorityTypes';

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const getPriorityColor = (priority: PriorityLevel) => {
  switch (priority) {
    case PriorityLevel.HIGH:
      return '#ff6361';
    case PriorityLevel.MODERATE:
      return '#ffd700';
    case PriorityLevel.LOW:
      return '#003f5c';
    default:
      return '#003f5c';
  }
};
