import React, { useState, useLayoutEffect } from 'react'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import { Switch, InputNumber, Button, Radio } from 'antd'
import { useHistory } from 'react-router-dom'
import { CheckOutlined, LeftOutlined } from '@ant-design/icons'

import { TimePicker } from '@components/DateTimePicker'
import useWorkhours from '@hooks/useWorkhours'
import useConfig from '@/hooks/useConfig'
import { DayWorkHour, timeToNative, nativeToTime, Time, Duration } from '@/def/DayWorkDef'
import { Config } from '@/def/ConfigDef'

const backgroundImageCount: number = Number(process.env.REACT_APP_BACKGROUND_IMAGE_COUNT) || 1

const Page = styled.div`
  margin: 15px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
`

const Row = styled.div`
  padding: 7.5px 10px;
`

const BGImgPicker = styled('div')<{ bgIndex: number }>`
  width: 70px;
  height: 70px;
  background-image: ${prop =>
    `url('` + require(`../assets/img/repeat${prop.bgIndex}.jpg`).default + `')`};
  border-radius: 3px;
  border: 1.5px solid #3d3d3d;
  background-position: center;
  background-repeat: repeat;
  background-size: 80%;
  margin-top: 5px;
`

const Setting: React.FC = () => {
  const history = useHistory()
  const [workhour, setWorkhour] = useWorkhours()
  const [config, setConfig] = useConfig()

  const [currentWorkhour, setCurrentWorkhour] = useState<DayWorkHour>(workhour)
  const [currentConfig, setCurrentConfig] = useState<Config>(config)

  useLayoutEffect(() => {
    setCurrentWorkhour(workhour)
    setCurrentConfig(config)
  }, [workhour, config])

  const cancelClick = () => {
    history.push('/')
  }

  const saveClick = () => {
    setWorkhour(currentWorkhour)
    setConfig(currentConfig)
    history.push('/')
  }

  const range: (count: number) => number[] = count =>
    Array.from(new Array(count), (_, index) => index + 1)

  return (
    <Page>
      <Helmet>
        <title>设置工作时间</title>
      </Helmet>

      <Row>
        上班时间：
        <TimePicker
          onChange={value => {
            value &&
              setCurrentWorkhour({
                ...currentWorkhour,
                begin: nativeToTime(value),
              })
          }}
          defaultValue={timeToNative(currentWorkhour.begin)}
          format="HH:mm"
          size="small"
          allowClear={false}
          showNow={false}
          inputReadOnly
        />
      </Row>
      <Row>
        下班时间：
        <TimePicker
          onChange={value => {
            value &&
              setCurrentWorkhour({
                ...currentWorkhour,
                end: nativeToTime(value),
              })
          }}
          defaultValue={timeToNative(currentWorkhour.end)}
          format="HH:mm"
          size="small"
          allowClear={false}
          showNow={false}
          inputReadOnly
        />
      </Row>

      <Row style={{ marginTop: 30 }}>
        是否有午休：
        <Switch
          onChange={value => {
            console.log(value)
            setCurrentWorkhour({
              ...currentWorkhour,
              hasRest: value,
            })
          }}
          defaultChecked={currentWorkhour.hasRest}
          style={{ marginLeft: 5 }}
        />
      </Row>

      {currentWorkhour.hasRest ? (
        <>
          <Row>
            午休开始：
            <TimePicker
              onChange={value => {
                value &&
                  setCurrentWorkhour({
                    ...currentWorkhour,
                    restBegin: nativeToTime(value),
                  })
              }}
              defaultValue={timeToNative(currentWorkhour.restBegin as Time)}
              format="HH:mm"
              size="small"
              allowClear={false}
              showNow={false}
              inputReadOnly
            />
          </Row>
          <Row>午休时长：</Row>
          <Row>
            <InputNumber
              onChange={value => {
                setCurrentWorkhour({
                  ...currentWorkhour,
                  restDuration: {
                    ...currentWorkhour.restDuration,
                    hour: value,
                  } as Duration,
                })
              }}
              defaultValue={currentWorkhour?.restDuration?.hour}
              min={0.5}
              max={2}
              step={0.5}
              size="small"
              style={{ marginRight: 5, marginLeft: 15 }}
              precision={0}
            />
            小时
          </Row>
          <Row>
            <InputNumber
              onChange={value => {
                setCurrentWorkhour({
                  ...currentWorkhour,
                  restDuration: {
                    ...currentWorkhour.restDuration,
                    minute: value,
                  } as Duration,
                })
              }}
              defaultValue={currentWorkhour?.restDuration?.minute}
              min={0}
              max={59}
              step={1}
              size="small"
              style={{ marginRight: 5, marginLeft: 15 }}
              precision={0}
            />
            分钟
          </Row>
          <Row>注：目前只计算距离下班时间的时长，暂不考虑午休</Row>
        </>
      ) : null}

      <Row>
        <span>背景图案：</span>
        <div style={{ display: 'inline-block' }}>
          <Radio.Group
            onChange={e => {
              setCurrentConfig({
                ...currentConfig,
                backgroundIndex: e.target.value || 1,
              })
            }}
            defaultValue={currentConfig.backgroundIndex}
          >
            {range(backgroundImageCount).map(index => (
              <div key={index} style={{ display: 'inline-block', marginRight: '15px' }}>
                <Radio value={index}>背景{index}</Radio>
                <BGImgPicker bgIndex={index} />
              </div>
            ))}
          </Radio.Group>
        </div>
      </Row>

      <Row style={{ marginTop: 30, textAlign: 'right' }}>
        <Button
          onClick={cancelClick}
          icon={<LeftOutlined />}
          style={{ marginRight: 20 }}
          size="small"
          danger
          ghost
        >
          取消
        </Button>
        <Button onClick={saveClick} icon={<CheckOutlined />} type="primary" size="small" ghost>
          保存设置
        </Button>
      </Row>
    </Page>
  )
}

export default Setting
