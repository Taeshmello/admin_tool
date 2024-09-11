import React from 'react';
import { Modal } from 'antd';
import './Popup.css'
import UserDetails from './User_details';

interface EditModalProps {
    visible: boolean;
    onClose: () => void;
    onOk: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, onClose, onOk }) => {
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
            <UserDetails />
        </Modal>
    );
};

export default EditModal;
