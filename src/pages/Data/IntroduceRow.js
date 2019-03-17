import React, { memo, Fragment } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import Yuan from '@/utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading,specialStats=[],userStats={} }) => (
  <Row gutter={24}>
   <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={'福建中考英语听力宝'}
        action={
          <Tooltip
            title={'福建中考英语听力宝'}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={`${numeral(userStats.touristAmount).format('0,0')}`}
        footer={
          <Field
            label={"授权人数"}
            value={`${numeral(userStats.registerAmount).format('0,0')}`}
          />
        }
        contentHeight={46}
        statusTitle={'游客'}
      >

      </ChartCard>
    </Col>
 { specialStats.length>0 && specialStats.map(item=>{
   {/* debugger */}
  return  <Col {...topColResponsiveProps} key={item.specialId}>
      <ChartCard
        bordered={false}
        title={item.specialTitle}
        action={
          <Tooltip
            title={item.specialTitle}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={`${numeral(item.complete).format('0,0')}`}
        footer={
          <Field
            label={<FormattedMessage id="app.analysis.authorize-num" defaultMessage="Daily Sales" />}
            value={`${numeral(item.access).format('0,0')}`}
          />
        }
        contentHeight={46}
        statusTitle={'已完成'}
      >

      </ChartCard>
    </Col>
 })
 }
  
  </Row>
));

export default IntroduceRow;
