import styled from 'styled-components'

const FilterInput = styled.input`
  display: none;
  &:checked + label {
    background: rgb(27, 152, 245);
    color: white;
  }
`

const FilterLabel = styled.label`
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

export { FilterInput, FilterLabel, TimelineFilterContainer }