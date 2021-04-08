import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useInterval } from 'ahooks'

import { DayWorkHour } from '@/def/DayWorkDef'
import { calcLeftWorkhours } from './timeCalc'

const Wrap = styled.div`
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

const DayWorkhoursLeft: React.FC<DayWorkHour> = props => {
  const [hour, setHour] = useState<number>(0)
  const [minute, setMinute] = useState<number>(0)

  const numPaddingTwo = (num: number): string => String(num).padStart(2, '0')

  useInterval(
    () => {
      const { hour, minute } = calcLeftWorkhours(props)
      setHour(hour)
      setMinute(minute)
    },
    10 * 1000,
    { immediate: true }
  )

  if (hour <= 0 && minute <= 0) {
    return <div style={{ fontSize: 20 }}>下班啦！ 尽情享受生活吧 ~</div>
  }

  return (
    <Wrap>
      <Tips>距离下班时间还有：</Tips>
      <Time>
        <Num hints={'小时'}>{numPaddingTwo(hour)}</Num>
        <Colon />
        <Num hints={'分钟'}>{numPaddingTwo(minute)}</Num>
      </Time>
    </Wrap>
  )
}

export default DayWorkhoursLeft
