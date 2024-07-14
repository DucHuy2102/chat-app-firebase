import { useState } from 'react';
import './listChat.css';

const ListChat = () => {
    const [addMode, setAddMode] = useState(false);

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
            <div className='item'>
                <img src='./avatar.png' alt='' />
                <div className='texts'>
                    <span>Huy Shelby</span>
                    <p>Hello my friend</p>
                </div>
            </div>
            <div className='item'>
                <img src='./avatar.png' alt='' />
                <div className='texts'>
                    <span>Huy Shelby</span>
                    <p>Hello my friend</p>
                </div>
            </div>
            <div className='item'>
                <img src='./avatar.png' alt='' />
                <div className='texts'>
                    <span>Huy Shelby</span>
                    <p>Hello my friend</p>
                </div>
            </div>
            <div className='item'>
                <img src='./avatar.png' alt='' />
                <div className='texts'>
                    <span>Huy Shelby</span>
                    <p>Hello my friend</p>
                </div>
            </div>
        </div>
    );
};

export default ListChat;
