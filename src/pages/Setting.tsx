import React, { useState, useLayoutEffect } from 'react'
import Helmet from 'react-helmet'
import styled from '@emotion/styled'
import { Switch, InputNumber, Button, Radio, Tabs } from 'antd'
import { useHistory } from 'react-router-dom'
import { CheckOutlined, LeftOutlined } from '@ant-design/icons'

import { TimePicker } from '@/components/DateTimePicker'

import { IDayWorkhour, timeToNative, nativeToTime, IDuration } from '@/def/DayWorkDef'
import { IConfig } from '@/def/ConfigDef'
import { IWeekendRest, WeekRestType } from '@/def/WeekendDef'
import { ISalaryDay, SalaryDayCalcFn } from '@/def/SalaryDayDef'

import useConfig from '@/hooks/useConfig'
import useWorkhours from '@/hooks/useWorkhours'
import useWeekendRest from '@/hooks/useWeekend'
import useSalaryDay from '@/hooks/useSalaryDay'

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

const BGImgPreview = styled('div')<{ bgIndex: number }>`
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

  const [config, setConfig] = useConfig()
  const [workhour, setWorkhour] = useWorkhours()
  const [weekendRest, setWeekendRest] = useWeekendRest()
  const [salaryDay, setSalaryDay] = useSalaryDay()

  const [currentConfig, setCurrentConfig] = useState<IConfig>(config)
  const [currentWorkhour, setCurrentWorkhour] = useState<IDayWorkhour>(workhour)
  const [currentWeekendRest, setCurrentWeekendRest] = useState<IWeekendRest>(weekendRest)
  const [currentSalaryDay, setCurrentSalaryDay] = useState<ISalaryDay>(salaryDay)

  useLayoutEffect(() => {
    setCurrentConfig(config)
    setCurrentWorkhour(workhour)
    setCurrentWeekendRest(weekendRest)
    setCurrentSalaryDay(salaryDay)
  }, [workhour, config, weekendRest, salaryDay])

  const cancelClick = () => {
    history.push('/')
  }

  const saveClick = () => {
    setConfig(currentConfig)
    setWorkhour(currentWorkhour)
    setWeekendRest(currentWeekendRest)
    setSalaryDay(currentSalaryDay)

    history.push('/')
  }

  const range: (count: number) => number[] = count =>
    Array.from(new Array(count), (_, index) => index + 1)

  return (
    <Page>
      <Helmet>
        <title>设置工作时间</title>
      </Helmet>

      <Tabs defaultActiveKey="workhours" centered>
        <Tabs.TabPane tab="每日下班时间" key="workhours">
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
                  defaultValue={timeToNative(currentWorkhour.restBegin!)}
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
                      } as IDuration,
                    })
                  }}
                  defaultValue={currentWorkhour?.restDuration?.hour}
                  min={0}
                  max={2}
                  step={1}
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
                      } as IDuration,
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
              <Row>注：午休时间不会计入工时</Row>
            </>
          ) : null}
        </Tabs.TabPane>

        <Tabs.TabPane tab="周末设置" key="weekend">
          <Row>周末休息日：</Row>
          <Row>
            <Radio.Group
              onChange={e => {
                setCurrentWeekendRest({
                  ...currentWeekendRest,
                  type: e.target.value,
                })
              }}
              defaultValue={currentWeekendRest.type}
              size="small"
            >
              <Radio.Button value={WeekRestType.Double}>双休</Radio.Button>
              <Radio.Button value={WeekRestType.SingleAtSun}>周日单休</Radio.Button>
              <Radio.Button value={WeekRestType.SingleAtSat}>周六单休</Radio.Button>
            </Radio.Group>
          </Row>
          <Row>注：休息日不会计算工时</Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="发薪日设置" key="salary">
          <Row>发薪日计算方式：</Row>
          <Row>
            <Radio.Group
              onChange={e => {
                setCurrentSalaryDay({
                  ...currentSalaryDay,
                  type: e.target.value,
                })
              }}
              defaultValue={currentSalaryDay.type}
              size="small"
            >
              <Radio.Button value={SalaryDayCalcFn.FixDate}>第 n 日</Radio.Button>
              <Radio.Button value={SalaryDayCalcFn.CountBackward}>倒数第 n 日</Radio.Button>
            </Radio.Group>
          </Row>
          <Row>
            n =
            <InputNumber
              onChange={value => {
                setCurrentSalaryDay({
                  ...currentSalaryDay,
                  dateNumber: value as any,
                })
              }}
              defaultValue={currentSalaryDay.dateNumber}
              min={1}
              max={31}
              step={1}
              size="small"
              style={{ marginRight: 5, marginLeft: 15 }}
              precision={0}
            />
          </Row>
          <Row>例如每月最后一天发薪，则选择 “倒数第 n 日”，n 填 “1”</Row>
          <Row>例如每月15号发薪，则选择 “第 n 日”，n 填 “15”</Row>
          <Row>注：固定日发薪按照上班时间计算倒计时，倒数日发薪按照下班时间计算倒计时</Row>
        </Tabs.TabPane>

        <Tabs.TabPane tab="偏好设置" key="other">
          <Row>
            时间更新频率：
            <InputNumber
              onChange={(value: any) => {
                setCurrentConfig({
                  ...currentConfig,
                  timer: value * 1000,
                })
              }}
              defaultValue={currentConfig.timer / 1000}
              min={1}
              max={60}
              step={1}
              size="small"
              style={{ marginRight: 5, marginLeft: 15 }}
              precision={0}
            />
            秒
          </Row>
          <Row>注：缩短更新频率可以提高精度，但会占用更多系统资源并增加耗电量</Row>

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
                  <div
                    key={index}
                    style={{ display: 'inline-block', marginRight: '15px', marginTop: '10px' }}
                  >
                    <Radio value={index}>背景{index}</Radio>
                    <BGImgPreview bgIndex={index} />
                  </div>
                ))}
              </Radio.Group>
            </div>
          </Row>
        </Tabs.TabPane>
      </Tabs>

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
