import React from 'react';
import { Modal } from 'antd';
import './Popup.css'
import UserDetails from './User_details';

interface User {
    idx: number;
    id: string;
    signup_date: string;
    game: string;
}

interface EditModalProps {
    visible: boolean;
    onClose: () => void;
    onOk: () => void;
    user: User | null; 
}

const EditModal: React.FC<EditModalProps> = ({ visible, onClose, onOk, user }) => {
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
            <UserDetails user={user} /> 
        </Modal>
    );
};

export default EditModal;
