import { useEffect, useState } from 'react';
import './listChat.css';
import AddUser from '../addUser/AddUser';
import { userStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const ListChat = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    console.log('chats -->', chats);

    const { currentUser } = userStore();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'userChats', currentUser.id), async (res) => {
            const data = res.data();
            if (data && Array.isArray(data.chats)) {
                const items = data.chats;

                const promises = items?.map(async (item) => {
                    const userDocRef = await doc(db, 'users', item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);
                    const user = userDocSnap.data();
                    return { ...item, user };
                });

                const chatData = await Promise.all(promises);
                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            } else {
                setChats([]);
            }
        });

        return () => {
            unsub();
        };
    }, [currentUser.id]);

    return (
        <div className='listChat'>
            {/* search */}
            <div className='search'>
                {/* search input */}
                <div className='searchBar'>
                    <img src='./search.png' alt='' />
                    <input type='text' placeholder='Search' />
                </div>

                {/* button add */}
                <img
                    src={addMode ? './minus.png' : './plus.png'}
                    onClick={() => setAddMode(!addMode)}
                    alt=''
                    className='add'
                />
            </div>

            {/* list chat */}
            {chats.map((chat) => (
                <div className='item' key={chat.chatId}>
                    <img src={chat.user.avatar || './avatar.png'} alt='' />
                    <div className='texts'>
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    );
};

export default ListChat;
