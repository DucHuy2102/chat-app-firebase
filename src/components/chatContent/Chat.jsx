import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './chat.css';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { chatStore } from '../../lib/chatStore';
import { userStore } from '../../lib/userStore';
import upload from '../../lib/upload';

const Chat = () => {
    const [chat, setChat] = useState();
    const [img, setImg] = useState({
        file: null,
        url: '',
    });
    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const endRef = useRef(null);
    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [chat]);

    const handleClickEmoji = (e) => {
        setInputText((prev) => prev + e.emoji);
        setOpen(false);
    };

    const handleSendImage = (e) => {
        if (e.target.files[0]) {
            setImg({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = chatStore();
    const { currentUser } = userStore();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
            setChat(res.data());
        });

        return () => {
            unSub();
        };
    }, [chatId]);

    const handleSendMessage = async () => {
        if (inputText === '') return;

        let imgURL = null;

        try {
            if (img.file) {
                imgURL = await upload(img.file);
            }

            await updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text: inputText,
                    createdAt: new Date(),
                    ...(imgURL && { img: imgURL }),
                }),
            });

            const userIDs = [currentUser.id, user.id];
            userIDs.forEach(async (id) => {
                const userChatsRef = doc(db, 'userChats', id);
                const userChatsSnapShot = await getDoc(userChatsRef);
                if (userChatsSnapShot.exists()) {
                    const userChatsData = userChatsSnapShot.data();
                    const chatIndex = userChatsData.chats.findIndex(
                        (chat) => chat.chatId === chatId
                    );

                    userChatsData.chats[chatIndex].lastMessage = inputText;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats,
                    });
                }
            });

            setImg({
                file: null,
                url: '',
            });
            setInputText('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='chat'>
            {/* top */}
            <div className='top'>
                {/* user info */}
                <div className='user'>
                    <img src={user?.avatar || './avatar.png'} alt='' />
                    <div className='texts'>
                        <span>{user?.username}</span>
                        <p>Lorem ipsum, dolor sit amet.</p>
                    </div>
                </div>

                {/* icons */}
                <div className='icons'>
                    <img src='./phone.png' alt='' />
                    <img src='./video.png' alt='' />
                    <img src='./info.png' alt='' />
                </div>
            </div>

            {/* center */}
            <div className='center'>
                {chat?.messages?.map((ms) => (
                    <div
                        className={ms.senderId === currentUser?.id ? 'my message' : 'message'}
                        key={ms.createdAt}
                    >
                        <div className='texts'>
                            {ms.img && <img src={ms.img} alt='' />}
                            <p>{ms.text}</p>
                            {/* <span>1 min ago</span> */}
                        </div>
                    </div>
                ))}

                {img.url && (
                    <div className='my message'>
                        <div className='texts'>
                            <img src={img.url} alt='' />
                            {/* <span>1 min ago</span> */}
                        </div>
                    </div>
                )}

                <div ref={endRef}></div>
            </div>

            {/* bottom */}
            <div className='bottom'>
                <div className='icons'>
                    <label htmlFor='file'>
                        <img src='./img.png' alt='' />
                    </label>
                    <input
                        type='file'
                        id='file'
                        style={{ display: 'none' }}
                        onChange={handleSendImage}
                    />
                    <img src='./camera.png' alt='' />
                    <img src='./mic.png' alt='' />
                </div>
                <input
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                    type='text'
                    placeholder={
                        isCurrentUserBlocked || isReceiverBlocked
                            ? 'You cannot send message'
                            : 'Type a message...'
                    }
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <div className='emoji'>
                    <img src='./emoji.png' alt='' onClick={() => setOpen(!open)} />
                    <div className='picker'>
                        <EmojiPicker open={open} onEmojiClick={handleClickEmoji} />
                    </div>
                </div>
                <button
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                    className='btnSendMessage'
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
