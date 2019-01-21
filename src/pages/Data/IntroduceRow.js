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

const IntroduceRow = memo(({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={'福建中考英语听力宝'}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={`${numeral(226560).format('0,0')}`}
        footer={
          <Field
            label={<FormattedMessage id="app.analysis.authorize-num" defaultMessage="Daily Sales" />}
            value={`${numeral(82423).format('0,0')}`}
          />
        }
        contentHeight={46}
        statusTitle={'游客'}

      >

      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={'听力专项训练'}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={`${numeral(126560).format('0,0')}`}
        footer={
          <Field
            label={'进入人数'}
            value={`${numeral(22423).format('0,0')}`}
          />
        }
        contentHeight={46}
        statusTitle={'已完成'}

      >

      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={'仿真模拟练习'}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={`${numeral(8846).format('0,0')}`}
        footer={
          <Field
            label={'进入人数'}
            value={`${numeral(32423).format('0,0')}`}
          />
        }
        contentHeight={46}
        statusTitle={'已完成'}

      >

      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={'历年真题闯关'}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}

        total={`${numeral(6560).format('0,0')}`}

        footer={
          <Field
            label={'进入人数'}
            value={`${numeral(2423).format('0,0')}`}
          />
        }
        contentHeight={46}
        statusTitle={'已完成'}

      >

      </ChartCard>
    </Col>
  </Row>
));

export default IntroduceRow;
