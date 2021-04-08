import React from 'react'
import styled from '@emotion/styled'

const version = process.env.REACT_APP_VERSION as string

const Wrap = styled.div`
  margin-top: 5px;
  text-align: right;
  color: #525252;
  font-size: 12px;
`

const InfoText: React.FC = () => {
  return <Wrap>版本: {version}</Wrap>
}

export default InfoText
