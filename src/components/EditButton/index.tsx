import React from 'react'
import styled from '@emotion/styled'
import { Button, ButtonProps } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

const Wrap = styled.div`
  margin-top: 15px;
  text-align: right;
`

const EditButton: React.FC<ButtonProps> = props => {
  return (
    <Wrap>
      <Button
        {...props}
        icon={<SettingOutlined />}
        type="primary"
        size="small"
        ghost
      >设置</Button>
    </Wrap>
  )
}

export default EditButton
