import React from 'react'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

import useWorkhours from '@hooks/useWorkhours'
import DayWorkhoursLeft from '@components/DayWorkhoursLeft'
import EditButton from '@components/EditButton'
import InfoText from '@components/InfoText'

const Page = styled.div`
  padding: 15px;
`

const Background = styled.div`
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
`

const Home: React.FC = () => {
  const history = useHistory()

  const toSettingPage = () => {
    history.push('/setting')
  }

  const [dayWorkHour] = useWorkhours()

  return (
    <Page>
      <Helmet>
        <title>下班倒计时</title>
      </Helmet>
      <Background>
        <DayWorkhoursLeft {...dayWorkHour} />
      </Background>
      <EditButton onClick={toSettingPage} />
      <InfoText />
    </Page>
  )
}

export default Home
