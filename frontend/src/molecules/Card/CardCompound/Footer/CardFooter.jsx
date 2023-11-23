/* eslint-disable react/prop-types */
import React from 'react';
// library
import moment from 'moment';
import { FaClock } from 'react-icons/fa';
// styles
import styles from './CardFooter.module.scss';

function CardFooter({
  updatedAt, createdAt, onReadMore, showReadMore,
}) {
  return (
    <div className={styles.cardFooter}>
      <div className={styles.createdAt}>
        <FaClock />
        {updatedAt
          ? moment(updatedAt).format(' DD MMM')
          : moment(createdAt).format(' DD MMM')}
      </div>
      <div className={styles.buttonContainer}>
        {showReadMore && (
          <button
            type="button"
            className={styles.readBtn}
            onClick={onReadMore}
          >Read More
          </button>
        )}
      </div>
    </div>
  );
}

export default CardFooter;
