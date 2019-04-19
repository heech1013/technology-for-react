import React from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button/Button.js';

const cx = classNames.bind(styles);

const Pagination = () => (
  <div className={cx('pagination')}>
    <Button disabled> {/* JSX에서 따로 값 설정 없이 props 이름만 넣어주면 자동으로 disabled={true}로 설정된다. */}
      이전 페이지
    </Button>
    <div className={cx('number')}>
      페이지 1
    </div>
    <Button>
      다음 페이지
    </Button>
  </div>
);

export default Pagination;