import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useInterval } from 'ahooks'

import { calcLeftWeekend, IWeekendRest } from '@def/WeekendDef'
import useConfig from '@hooks/useConfig'
import { IDayWorkhour } from '@def/DayWorkDef'

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

export interface IWeekendLeftPageProps {
  workHours: IDayWorkhour
  weekendRest: IWeekendRest
}

const WeekendLeft: React.FC<IWeekendLeftPageProps> = props => {
  const [hour, setHour] = useState<number>(0)
  const [minute, setMinute] = useState<number>(0)

  const numPaddingTwo = (num: number): string => String(num).padStart(2, '0')
  const [{ timer }] = useConfig()

  useInterval(
    () => {
      const { hour, minute } = calcLeftWeekend(props.weekendRest.type, props.workHours)
      setHour(hour)
      setMinute(minute)
    },
    timer,
    { immediate: true }
  )

  if (isNaN(hour) || isNaN(minute)) {
    return <div style={{ fontSize: 20 }}>别急！ 还没到上班时间呢 ~</div>
  }

  return (
    <Wrap>
      <Tips>距离周末休息剩余工时还有：</Tips>
      <Time>
        <Num hints={'小时'}>{numPaddingTwo(hour)}</Num>
        <Colon />
        <Num hints={'分钟'}>{numPaddingTwo(minute)}</Num>
      </Time>
    </Wrap>
  )
}

export default WeekendLeft
