/* eslint-disable react/prop-types */
import React from 'react';
// styles
import styles from './CardBody.module.scss';

function CardDescription({ description }) {
  return (
    <div
      className={styles.cardDescription}
    >
      <span
        className={styles.textDescription}
      >
        {description}
      </span>
    </div>
  );
}

export default CardDescription;
