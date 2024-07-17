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
    const [searchUser, setSearchUser] = useState(null);
    console.log('searchUser -->', searchUser);

    const handleSearchUser = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');

        try {
            const userRef = collection(db, 'users');
            const q = query(userRef, where('username', '==', username));
            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setSearchUser(querySnapShot.docs[0].data());
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddUserChat = async () => {
        const chatRef = collection(db, 'chats');
        const userChatRef = collection(db, 'userChats');

        try {
            const newChatRef = doc(chatRef);
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                message: [],
            });
            await updateDoc(doc(userChatRef, searchUser.id), {
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
                    receiverId: searchUser.id,
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
            <form onSubmit={handleSearchUser}>
                <input type='text' placeholder='Username' name='username' />
                <button>Search</button>
            </form>

            {searchUser && (
                <div className='user'>
                    <div className='detail'>
                        <img src={searchUser.avatar || './avatar.png'} alt='' />
                        <span>{searchUser.username}</span>
                    </div>
                    <button onClick={handleAddUserChat}>Add User</button>
                </div>
            )}
        </div>
    );
};

export default AddUser;
