import React from 'react';
import { Modal } from 'antd';
import './Popup.css';
import UserDetails from './User_details';

interface EditModalProps {
    visible: boolean;
    onClose: () => void;
    onOk: () => void;
    userId: string | null; // userId prop 추가
}

const EditModal: React.FC<EditModalProps> = ({ visible, onClose, onOk, userId }) => {
    return (
        <Modal
            title="편집"
            centered
            open={visible}
            onOk={onOk}
            onCancel={onClose}
            width={500}
            height={1000}
        >
            <UserDetails/> {/* userId를 UserDetails에 전달 */}
        </Modal>
    );
};

export default EditModal;
