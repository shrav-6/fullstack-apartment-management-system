// Card.js
import React, { useState } from 'react';
import CardTitle from './Header/CardTitle';
import CardDescription from './Body/CardDescription';
import CardFooter from './Footer/CardFooter';
import CardModal from './Modal/CardModal';
// styles
import styles from '../Card.module.scss';
import '../CardModal.css';

function Card({
  notice, onSaveEdit, onDelete, context, showReadMore,
}) {
  const {
    id,
    description,
    title,
    updatedAt,
    createdAt,
  } = notice;
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [mode, setMode] = useState('readMore');

  const handleEdit = () => {
    setMode('edit');
    setEditedTitle(editedTitle);
    setEditedDescription(description);
    setModalVisible(true);
  };

  const handleAction = () => {
    if (onSaveEdit) {
      onSaveEdit(id, editedTitle, editedDescription);
    }
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditedTitle(title);
    setEditedDescription(description);
  };

  const handleReadMore = () => {
    setMode('readMore');
    setModalVisible(true);
  };

  return (
    <div className={styles.containerCard}>
      <CardTitle
        title={title}
        onEdit={handleEdit}
        onDelete={onDelete}
      />
      <CardDescription
        description={description}
      />
      <CardFooter
        updatedAt={updatedAt}
        createdAt={createdAt}
        onReadMore={handleReadMore}
        showReadMore={showReadMore}
      />
      <CardModal
        isModalVisible={isModalVisible}
        mode={mode}
        title={title}
        description={description}
        editedTitle={editedTitle}
        onTitleChange={setEditedTitle}
        editedDescription={editedDescription}
        onDescriptionChange={setEditedDescription}
        onOk={handleAction}
        onCancel={handleCancel}
        context={context}
      />
    </div>
  );
}

export default Card;
