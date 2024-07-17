import { useEffect, useState } from 'react';
import './listChat.css';
import AddUser from '../addUser/AddUser';
import { userStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { chatStore } from '../../../lib/chatStore';

const ListChat = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const filteredChats = chats.filter((chat) =>
        chat.user.username.toLowerCase().includes(searchUser.toLowerCase())
    );

    const { currentUser } = userStore();
    const { changeChat } = chatStore();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'userChats', currentUser.id), async (res) => {
            const data = res.data();
            if (data && Array.isArray(data.chats)) {
                const items = data.chats;

                const promises = items?.map(async (item) => {
                    const userDocRef = doc(db, 'users', item.receiverId);
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

    const handleSelectChat = async (chat) => {
        const usersChats = chats.map((chat) => {
            const { user, ...rest } = chat;
            return rest;
        });

        const chatIndex = usersChats.findIndex((item) => item.chatId === chat.chatId);
        usersChats[chatIndex].isSeen = true;
        const userChatsRef = doc(db, 'userChats', currentUser.id);
        try {
            await updateDoc(userChatsRef, {
                chats: usersChats,
            });
            changeChat(chat.chatId, chat.user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='listChat'>
            {/* search */}
            <div className='search'>
                {/* search input */}
                <div className='searchBar'>
                    <img src='./search.png' alt='' />
                    <input
                        onChange={(e) => setSearchUser(e.target.value)}
                        type='text'
                        placeholder='Search'
                    />
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
            {filteredChats.map((chat) => (
                <div
                    className='item'
                    style={{
                        backgroundColor: chat?.isSeen ? 'transparent' : '#5183fe',
                    }}
                    key={chat.chatId}
                    onClick={() => handleSelectChat(chat)}
                >
                    <img
                        src={
                            chat.user.blocked.includes(currentUser.id)
                                ? './avatar.png'
                                : chat.user.avatar || './avatar.png'
                        }
                        alt=''
                    />
                    <div className='texts'>
                        <span>
                            {chat.user.blocked.includes(currentUser.id)
                                ? 'User unknown'
                                : chat.user.username}
                        </span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    );
};

export default ListChat;
