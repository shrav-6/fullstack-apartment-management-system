/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import styles from './CardTitle.module.scss';

function CardTitle({
  title,
  onEdit,
  onDelete,
}) {
  const role = JSON.parse(sessionStorage.getItem('userCred'))?.role;
  const allowedRoles = ['Manager', 'Tenant'];
  return (
    <div className={styles.cardTitle}>
      <span
        title={title}
        className={styles.textTitle}
      >{title}
      </span>
      {allowedRoles.includes(role) && (
        <>
          <span
            tabIndex="0"
            role="button"
            className={styles.cardEdit}
            onClick={onEdit}
          >
            <FaEdit />
          </span>
          <span
            tabIndex="0"
            role="button"
            className={styles.cardDelete}
            onClick={onDelete}
          >
            <MdDelete />
          </span>
        </>
      )}
    </div>
  );
}

export default CardTitle;
