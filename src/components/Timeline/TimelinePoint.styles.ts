import styled from 'styled-components'
import { PriorityLevel } from '../../types/PriorityTypes';

const PriorityIndicator = styled.div<{ bgColor: string; priority: PriorityLevel; isPast: boolean }>`
  display: inline-block;
  vertical-align: middle;
  min-width: 16px;
  min-height: 16px;
  border-radius: 50%;
  border: 5px solid white;
  background-color: ${({ bgColor }) => bgColor};
  ${({ isPast }) => isPast && 'background-color: rgb(240, 242, 245);'}
  position: relative;
  z-index: 10;
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
    background-color: ${({ bgColor }) => bgColor};
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
    content: '${({ priority }) => priority} Priority';
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

export default PriorityIndicator