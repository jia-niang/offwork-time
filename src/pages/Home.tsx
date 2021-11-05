import React, { useLayoutEffect } from 'react'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

import EditButton from '@/components/EditButton'
import InfoText from '@/components/InfoText'

import useConfig from '@/hooks/useConfig'
import useWorkhours from '@/hooks/useWorkhours'
import useWeekendRest from '@/hooks/useWeekend'
import useSalaryDay from '@/hooks/useSalaryDay'

import DayWorkhoursLeft from '@/components/DayWorkhoursLeft'
import WeekendLeft from '@/components/WeekendLeft'
import SalaryDayLeft from '@/components/SalaryDayLeft'

const Page = styled.div`
  padding: 15px;
`

const ComponentWrap = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
`

const Home: React.FC = () => {
  const history = useHistory()

  const [config] = useConfig()
  const [dayWorkHour] = useWorkhours()
  const [weekendRest] = useWeekendRest()
  const [salaryDay] = useSalaryDay()

  useLayoutEffect(() => {
    document.body.style.backgroundImage =
      `url('` + require(`../assets/img/repeat${config.backgroundIndex}.jpg`).default + `')`
  }, [config])

  const toSettingPage = () => {
    history.push('/setting')
  }

  return (
    <Page>
      <Helmet>
        <title>下班倒计时</title>
      </Helmet>
      <ComponentWrap>
        <DayWorkhoursLeft workHours={dayWorkHour} />
      </ComponentWrap>
      <ComponentWrap style={{ marginTop: '15px' }}>
        <WeekendLeft workHours={dayWorkHour} weekendRest={weekendRest} />
      </ComponentWrap>
      <ComponentWrap style={{ marginTop: '15px' }}>
        <SalaryDayLeft workHours={dayWorkHour} weekendRest={weekendRest} salaryDay={salaryDay} />
      </ComponentWrap>
      <EditButton onClick={toSettingPage} />
      <InfoText />
    </Page>
  )
}

export default Home
