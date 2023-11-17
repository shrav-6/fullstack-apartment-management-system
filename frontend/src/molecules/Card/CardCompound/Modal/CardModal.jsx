/* eslint-disable react/prop-types */
// CardModal.js
import React from 'react';
// libarary
import { Modal, Button, Input } from 'antd';
// styles
import styles from './CardModal.module.scss';

function CardModal({
  isModalVisible,
  mode,
  title,
  description,
  editedTitle,
  onTitleChange,
  editedDescription,
  onDescriptionChange,
  onOk,
  onCancel,
}) {
  return (
    <Modal
      title={mode === 'edit' ? 'Edit Notice' : 'Notice Details'}
      open={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable
      className={styles.modaleditContainer}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onOk}>
          {mode === 'edit' ? 'Save' : 'Ok'}
        </Button>,
      ]}
    >
      <div className={styles.containerInput}>
        {
          mode === 'readMore' ? (
            <span
              className={styles.readMoreTitle}
            >
              {title}
            </span>
          ) : (
            <>
              <span className={styles.textInputLabel}>
                Title
              </span><Input
                className={styles.input}
                value={editedTitle}
                onChange={e => onTitleChange(e.target.value)}
                disabled={mode !== 'edit'}
              />
            </>
          )
        }
      </div>
      <div className={styles.containerInput}>
        {
          mode === 'readMore' ? (
            <span
              className={styles.readMoreDesc}
            >
              {description}
            </span>
          ) : (
            <>
              <span className={styles.textInputLabel}>
                Description
              </span><Input.TextArea
                className={styles.input}
                value={editedDescription}
                onChange={e => onDescriptionChange(e.target.value)}
                disabled={mode !== 'edit'}
              />
            </>
          )
        }
      </div>
    </Modal>
  );
}

export default CardModal;
