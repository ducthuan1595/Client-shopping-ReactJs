import { useDispatch } from 'react-redux';
import { closePopup } from '../../store/producterSlice';
import styled from './Modal.module.css';

const Modal = ({onOpen}) => {
  const dispatch = useDispatch()
  const closes = () => {
    onOpen(false);
    dispatch(closePopup());
  }
  return (
    <div className={styled.modal} onClick={closes}>
      {/* <div className={styled.content}>{props.children}</div> */}
    </div>
  )
};

export default Modal;
