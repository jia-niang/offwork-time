import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useInterval } from 'ahooks'

import useConfig from '@/hooks/useConfig'
import { IWeekendRest } from '@/def/WeekendDef'
import { IDayWorkhour } from '@/def/DayWorkDef'
import { calcLeftSalaryDay, ISalaryDay } from '@/def/SalaryDayDef'

const Wrap = styled.div`
  padding: 15px;
  cursor: pointer;
  text-align: center;
`

const Tips = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`

const Time = styled.div`
  vertical-align: middle;
`

const Num = styled('div')<{ hints: string }>`
  display: inline-block;
  text-align: right;
  font-size: 30px;
  line-height: 1;

  &::after {
    content: '${props => props.hints}';
    font-size: 12px;
    text-align: right;
    margin-left: 5px;
    color: #525252;
    text-shadow: none;
  }
`

const Colon = styled.div`
  display: inline-block;
  margin: 0 10px;

  &::after {
    font-size: 20px;
    content: ':';
  }
`

export interface ISalaryLeftPageProps {
  workHours: IDayWorkhour
  weekendRest: IWeekendRest
  salaryDay: ISalaryDay
}

const SalaryDayLeft: React.FC<ISalaryLeftPageProps> = props => {
  const [hour, setHour] = useState<number>(0)
  const [minute, setMinute] = useState<number>(0)

  const numPaddingTwo = (num: number): string => String(num).padStart(2, '0')
  const [{ timer }] = useConfig()

  useInterval(
    () => {
      const { hour, minute } = calcLeftSalaryDay(
        props.salaryDay,
        props.workHours,
        props.weekendRest
      )
      setHour(hour)
      setMinute(minute)
    },
    timer,
    { immediate: true }
  )

  return (
    <Wrap>
      <Tips>距离发薪日剩余工时还有：</Tips>
      <Time>
        <Num hints={'小时'}>{numPaddingTwo(hour)}</Num>
        <Colon />
        <Num hints={'分钟'}>{numPaddingTwo(minute)}</Num>
      </Time>
    </Wrap>
  )
}

export default SalaryDayLeft
