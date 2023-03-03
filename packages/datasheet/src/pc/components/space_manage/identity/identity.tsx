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

import { FC } from 'react';
import * as React from 'react';
import { Strings, t } from '@apitable/core';
import classNames from 'classnames';
import styles from './style.module.less';

interface IIdentityProps {
  type: 'mainAdmin' | 'subAdmin' | 'inactive';
  className?: string;
  style?: React.CSSProperties;
}

export const Identity: FC<React.PropsWithChildren<IIdentityProps>> = ({ type, className, style }) => {

  const classes = classNames(
    styles.memberTag, 
    {
      [styles.primaryTag]: type === 'mainAdmin',
      [styles.subTag]: type === 'subAdmin',
      [styles.inactiveTag]: type === 'inactive',
    },
    className,
  );
  const getName = () => {
    switch(type) {
      case 'mainAdmin': 
        return t(Strings.primary_admin);
      case 'subAdmin':
        return t(Strings.admin);
      case 'inactive':
        return t(Strings.added_not_yet);
      default: 
        return '';
    }
  };
  return (
    <span className={classes} style={style}>{getName()}</span>
  );
};