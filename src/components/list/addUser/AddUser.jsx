import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import './addUser.css';
import { useState } from 'react';
import { userStore } from '../../../lib/userStore';

const AddUser = () => {
    const { currentUser } = userStore();
    const [addUser, setAddUser] = useState(null);
    console.log('addUser -->', addUser);

    const handleAddNewUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');

        try {
            const userRef = collection(db, 'users');
            const q = query(userRef, where('username', '==', username));
            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setAddUser(querySnapShot.docs[0].data());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddChat = async () => {
        const chatRef = collection(db, 'chats');
        const userChatRef = collection(db, 'userChats');

        try {
            const newChatRef = doc(chatRef);
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                message: [],
            });
            await updateDoc(doc(userChatRef, addUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    receiverId: currentUser.id,
                    lastMessage: '',
                    updatedAt: Date.now(),
                }),
            });
            await updateDoc(doc(userChatRef, currentUser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    receiverId: addUser.id,
                    lastMessage: '',
                    updatedAt: Date.now(),
                }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='addUser'>
            <form onSubmit={handleAddNewUser}>
                <input type='text' placeholder='Username' name='username' />
                <button>Search</button>
            </form>

            {addUser && (
                <div className='user'>
                    <div className='detail'>
                        <img src={addUser.avatar || './avatar.png'} alt='' />
                        <span>{addUser.username}</span>
                    </div>
                    <button onClick={handleAddChat}>Add User</button>
                </div>
            )}
        </div>
    );
};

export default AddUser;
