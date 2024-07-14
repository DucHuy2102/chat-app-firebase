import { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './chat.css';

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const endRef = useRef(null);
    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const handleClickEmoji = (e) => {
        setInputText((prev) => prev + e.emoji);
        setOpen(false);
    };

    return (
        <div className='chat'>
            {/* top */}
            <div className='top'>
                {/* user info */}
                <div className='user'>
                    <img src='./avatar.png' alt='' />
                    <div className='texts'>
                        <span>Duc Huy</span>
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
                <div className='message'>
                    <img src='./avatar.png' alt='' />
                    <div className='texts'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quis, repudiandae rem maxime quisquam quae
                            nobis sint iste illo obcaecati nisi.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='my message'>
                    <div className='texts'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quis, repudiandae rem maxime quisquam quae
                            nobis sint iste illo obcaecati nisi.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='message'>
                    <img src='./avatar.png' alt='' />
                    <div className='texts'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quis, repudiandae rem maxime quisquam quae
                            nobis sint iste illo obcaecati nisi.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='my message'>
                    <div className='texts'>
                        <img
                            src='https://assets.goal.com/images/v3/blt8ebbaea67d2b1c54/752d38621b7815f91630c31c14716f04edbee7c5.jpg?auto=webp&format=pjpg&width=3840&quality=60'
                            alt=''
                        />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quis, repudiandae rem maxime quisquam quae
                            nobis sint iste illo obcaecati nisi.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='message'>
                    <img src='./avatar.png' alt='' />
                    <div className='texts'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quis, repudiandae rem maxime quisquam quae
                            nobis sint iste illo obcaecati nisi.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='my message'>
                    <div className='texts'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quis, repudiandae rem maxime quisquam quae
                            nobis sint iste illo obcaecati nisi.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>

                <div ref={endRef}></div>
            </div>

            {/* bottom */}
            <div className='bottom'>
                <div className='icons'>
                    <img src='./img.png' alt='' />
                    <img src='./camera.png' alt='' />
                    <img src='./mic.png' alt='' />
                </div>
                <input
                    type='text'
                    placeholder='Type a message...'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <div className='emoji'>
                    <img
                        src='./emoji.png'
                        alt=''
                        onClick={() => setOpen(!open)}
                    />
                    <div className='picker'>
                        <EmojiPicker
                            open={open}
                            onEmojiClick={handleClickEmoji}
                        />
                    </div>
                </div>
                <button className='btnSendMessage'>Send</button>
            </div>
        </div>
    );
};

export default Chat;
