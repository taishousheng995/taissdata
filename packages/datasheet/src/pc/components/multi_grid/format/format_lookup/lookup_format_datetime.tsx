/**
 * APITable <https://github.com/apitable/apitable>
 * Copyright (C) 2022 APITable Ltd. <https://apitable.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { DateFormat, IDateTimeFieldProperty, IField, Strings, t, TimeFormat } from '@apitable/core';
import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import styles from '../styles.module.less';
import { Switch } from 'antd';
import settingStyles from '../../field_setting/styles.module.less';
import { Divider } from 'pc/components/common/divider';
import { ComponentDisplay, ScreenSize } from 'pc/components/common/component_display';
import { MobileSelect } from 'pc/components/common';
import { Select } from '@apitable/components';

interface IFormatDateTime {
  currentField: IField;
  setCurrentField: Dispatch<SetStateAction<IField>>;
}

const optionData4Date = [
  { value: DateFormat['YYYY/MM/DD'], label: t(Strings.label_format_year_month_and_day_split_by_slash) },
  { value: DateFormat['YYYY-MM-DD'], label: t(Strings.label_format_year_month_and_day_split_by_dash) },
  { value: DateFormat['DD/MM/YYYY'], label: t(Strings.label_format_day_month_and_year_split_by_slash) },
  { value: DateFormat['YYYY-MM'], label: t(Strings.label_format_year_and_month_split_by_dash) },
  { value: DateFormat['MM-DD'], label: t(Strings.label_format_month_and_day_split_by_dash) },
  { value: DateFormat['YYYY'], label: t(Strings.label_format_year) },
  { value: DateFormat['MM'], label: t(Strings.label_format_month) },
  { value: DateFormat['DD'], label: t(Strings.label_format_day) },
];

const optionData4Time = [
  { value: TimeFormat['hh:mm'], label: t(Strings.twelve_hour_clock) },
  { value: TimeFormat['HH:mm'], label: t(Strings.twenty_four_hour_clock) },
];

export const LookUpFormatDateTime: React.FC<React.PropsWithChildren<IFormatDateTime>> = (props: IFormatDateTime) => {
  const { includeTime, dateFormat, autoFill, timeFormat } = (props.currentField.property.formatting as IDateTimeFieldProperty) || {};

  const handleDateFormatChange = (value: DateFormat) => {
    props.setCurrentField({
      ...props.currentField,
      property: {
        ...props.currentField.property,
        formatting: {
          autoFill,
          includeTime,
          dateFormat: value,
          timeFormat,
        },
      },
    });
  };

  const handleTimeFormatChange = (value: TimeFormat) => {
    props.setCurrentField({
      ...props.currentField,
      property: {
        ...props.currentField.property,
        formatting: {
          autoFill,
          includeTime,
          dateFormat,
          timeFormat: value,
        },
      } as any,
    });
  };

  const handleIncludeTimeChange = (checked: boolean) => {
    props.setCurrentField({
      ...props.currentField,
      property: {
        ...props.currentField.property,
        formatting: {
          autoFill,
          includeTime: checked,
          dateFormat,
          timeFormat,
        },
      },
    });
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>{t(Strings.datetime_format)}</div>
      <ComponentDisplay minWidthCompatible={ScreenSize.md}>
        <Select
          triggerCls={styles.customSelect}
          value={dateFormat}
          onSelected={option => {
            handleDateFormatChange(option.value as DateFormat);
          }}
          dropdownMatchSelectWidth={false}
          options={optionData4Date}
        />
      </ComponentDisplay>

      <ComponentDisplay maxWidthCompatible={ScreenSize.md}>
        <MobileSelect defaultValue={dateFormat} onChange={handleDateFormatChange} optionData={optionData4Date} />
      </ComponentDisplay>
      <section className={settingStyles.section} style={{ marginTop: 16 }}>
        <div className={classNames(settingStyles.sectionTitle, settingStyles.sub)}>
          {t(Strings.include_time)}
          <Switch size="small" checked={includeTime} onChange={handleIncludeTimeChange} />
        </div>
      </section>
      {includeTime && <Divider />}
      {includeTime && (
        <section className={settingStyles.section}>
          <div className={settingStyles.sectionTitle}>{t(Strings.time_format)}</div>
          <ComponentDisplay minWidthCompatible={ScreenSize.md}>
            <Select
              triggerCls={styles.customSelect}
              dropdownMatchSelectWidth={false}
              value={timeFormat}
              onSelected={option => handleTimeFormatChange(option.value as TimeFormat)}
              options={optionData4Time}
            />
          </ComponentDisplay>
          <ComponentDisplay maxWidthCompatible={ScreenSize.md}>
            <MobileSelect defaultValue={timeFormat} onChange={handleTimeFormatChange} optionData={optionData4Time} />
          </ComponentDisplay>
        </section>
      )}
    </div>
  );
};
