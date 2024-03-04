import React from 'react'
import { TimelineFilterContainer, FilterInput, FilterLabel } from './TimelineFilter.styles'

const TimelineFilter = () => {
  return (
    <>
      <TimelineFilterContainer>
      <FilterInput type="radio" name="priority-filter" id="high" />
      <FilterLabel htmlFor="high">High</FilterLabel>
      <FilterInput type="radio" name="priority-filter" id="moderate" />
      <FilterLabel htmlFor="moderate">Moderate</FilterLabel>
      <FilterInput type="radio" name="priority-filter" id="low" />
      <FilterLabel htmlFor="low">Low</FilterLabel>
    </TimelineFilterContainer>
    <TimelineFilterContainer>
      <FilterInput type="radio" name="period-filter" id="accountingPeriodEnd" />
      <FilterLabel htmlFor="accountingPeriodEnd">Accounting Period End</FilterLabel>
      <FilterInput type="radio" name="period-filter" id="vatPeriodEnd" />
      <FilterLabel htmlFor="vatPeriodEnd">VAT Period End</FilterLabel>
      <FilterInput type="radio" name="period-filter" id="vatPeriodReportingDue" />
      <FilterLabel htmlFor="vatPeriodReportingDue">VAT Period Reporting Due</FilterLabel>
      <FilterInput type="radio" name="period-filter" id="bankIntegrationRenewal" />
      <FilterLabel htmlFor="bankIntegrationRenewal">Bank Integration Renewal</FilterLabel>
    </TimelineFilterContainer>
  </>
  )
}

export default TimelineFilter