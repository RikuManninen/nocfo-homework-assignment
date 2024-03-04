import styled from 'styled-components'

const StyledItem = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  width: fit-content;
  &:hover .timeline-item {
    transform: scale(1.03);
  }
`

const CurrentPoint = styled.div`
  width: 0.75em;
  height: 0.75rem;
  border-radius: 50%;
  background-color: #1b98f5;
  position: absolute;
  left: 114px;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid rgb(240, 242, 245);
  @media (max-width: 460px) {
    left: 98px;
  }
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
  @media (max-width: 460px) {
    left: 6.75em;
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
    @media (max-width: 1000px) {
      display: none;
    }
    &.current {
      visibility: visible;
      transform: scale(1);
      opacity: 1;
      display: block;
      left: 11em;
      background: rgb(27, 152, 245);
      color: white;
      @media (max-width: 460px) {
        width: calc(100% - 11em);
        white-space: normal;
        left: 10em;
      }
      &::before {
        border-color: rgb(27, 152, 245);
        border-width: 0 0 7px 7px;
      }
    }
    &::before {
      content: '';
      position: absolute;
      border-radius: 2px;
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
    @media (max-width: 460px) {
      font-size: 0.8rem;
      width:150px;
    }
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
  z-index: 11;
  @media (max-width: 460px) {
    width: calc(100% - 5rem);
  }
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
  border: 2px solid rgb(240, 242, 245);
  border-radius: 1rem;
  transition: transform 0.1s ease-out;
  user-select: none;
  &.colored {
    background-color: rgb(240, 242, 245);
    color: rgba(66, 90, 112, 0.5);
  }
  &:hover + .day-label {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  }
  @media (max-width: 460px) {
    font-size: 0.9rem;
  }
`

const Spacer = styled.div`
  flex: 1 1 0%;
`;

const ItemsContainer = styled.div`
  padding: 0px 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

interface LabelContainerProps {
  center?: boolean;
}

const LabelContainer = styled.div<LabelContainerProps>`
  display: flex;
  position: relative;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  @media (max-width: 460px) {
    justify-content: ${({ center }) => (center ? 'flex-end' : 'flex-start')};
    width: 100%;
  }
`;

const ItemDate = styled.div`
  min-width: 6rem;
  text-align: right;
  @media (max-width: 460px) {
    min-width: 5rem;
    font-size: 0.9rem;
  }
`;

export { TimelineContainer, TimelineHeader, TimelineItem, Label, VerticalLine, CurrentPoint, StyledItem, InfoContainer, InfoBox, Spacer, ItemsContainer, LabelContainer, ItemDate };
