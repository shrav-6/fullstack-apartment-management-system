/* eslint-disable react/prop-types */
// /* eslint-disable jsx-a11y/label-has-associated-control */
// /* eslint-disable react/prop-types */
// /* eslint-disable arrow-body-style */
// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { FaClock, FaEdit } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';
// import moment from 'moment';
// import _get from 'lodash/get';
// import { Modal, Button, Input } from 'antd';
// // styles
// import styles from '../Card.module.scss';
// import '../CardModal.css';

// function Card({
//   notice,
//   onSaveEdit,
//   onDelete,
// }) {
//   const {
//     id,
//     createdAt,
//     description,
//     title,
//     updatedAt,
//     Author_name,
//   } = notice;

//   const [isModalVisible, setModalVisible] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(title);
//   const [editedDescription, setEditedDescription] = useState(description);
//   const [mode, setMode] = useState('readMore');
//   const role = JSON.parse(sessionStorage.getItem('userCred'))?.role;

//   const handleEdit = (e) => {
//     e.stopPropagation();
//     setMode('edit');
//     setEditedTitle(editedTitle);
//     setEditedDescription(description);
//     setModalVisible(true);
//   };

//   const handleAction = () => {
//     if (onSaveEdit) {
//       onSaveEdit(id, editedTitle, editedDescription);
//     }
//     setModalVisible(false);
//   };

//   const handleCancel = () => {
//     setModalVisible(false);
//     setEditedTitle(title);
//     setEditedDescription(description);
//   };
//   const handleReadMore = () => {
//     setMode('readMore');
//     setModalVisible(true);
//   };

//   return (
//     <>
//       <div
//         className={styles.containerCard}
//         key={id}
//       >
//         <div className={styles.cardTitle}>
//           <span
//             title={title}
//             className={styles.textTitle}
//           >
//             {title}
//           </span>
//           {role === 'Manager' && (
//             <span
//               tabIndex="0"
//               role="button"
//               className={styles.cardEdit}
//               onClick={handleEdit}
//             >
//               <FaEdit />
//             </span>
//           )}
//           {role === 'Manager' && (
//             <span
//               tabIndex="0"
//               role="button"
//               className={styles.cardDelete}
//               onClick={() => onDelete(id)}
//             >
//               <MdDelete />
//             </span>
//           )}
//         </div>
//         <div className={styles.cardAuthor}>
//           <span className={styles.author}>{Author_name}</span>
//         </div>
//         <div className={styles.cardDescription}>
//           {description}
//         </div>
//         <div className={styles.createdAt}><FaClock />
//           {updatedAt
//             ? moment(updatedAt).format(' DD MMM')
//             : moment(createdAt).format(' DD MMM')}
//         </div>
//         <div className={styles.buttonContainer}>
//           <button
//             type="button"
//             className={styles.readBtn}
//             onClick={handleReadMore}
//           >Read More
//           </button>
//         </div>
//       </div>
//       <Modal
//         title={null}
//         open={isModalVisible}
//         onOk={handleCancel}
//         maskClosable
//         className={styles.modaleditContainer}
//         footer={[
//           <Button key="save" type="primary" onClick={handleAction}>
//             Save Edit
//           </Button>,
//           <Button key="cancel" onClick={handleCancel}>
//             Cancel
//           </Button>,
//         ]}
//       >
//         {mode === 'readMore' && (
//           <div className="modal-content-container">
//             <div className="modal-title">
//               <h2>{title}</h2>
//             </div>
//             <div className="modal-description">
//               <p>{description}</p>
//             </div>
//           </div>
//         )}

//         {mode === 'edit' && (
//           <div className={styles.modelContainer}>
//             <div className={styles.editContainer}>
//               <section>
//                 <label>Title:</label>
//                 <Input
//                   value={editedTitle}
//                   onChange={e => setEditedTitle(e.target.value)}
//                 />
//               </section>
//               <section>

//                 <label>Description:</label>
//                 <Input.TextArea
//                   value={editedDescription}
//                   onChange={e => setEditedDescription(e.target.value)}
//                   autoSize={{ minRows: 3, maxRows: 5 }}
//                 />
//               </section>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </>
//   );
// }

// const mapStateToProps = ({ noticeReducer }) => ({
//   postType: _get(noticeReducer, 'postType'),
// });

// const mapDispatchToProps = (/* dispatch */) => ({
//   // onSetPostType: postType => dispatch(setPostType(postType)),
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Card);

// Card.js
import React, { useState } from 'react';
import CardTitle from './Header/CardTitle';
import CardDescription from './Body/CardDescription';
import CardFooter from './Footer/CardFooter';
import CardModal from './Modal/CardModal';
// styles
import styles from '../Card.module.scss';
import '../CardModal.css';

function Card({ notice, onSaveEdit, onDelete }) {
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
      />
    </div>
  );
}

export default Card;
