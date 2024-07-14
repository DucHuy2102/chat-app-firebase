import './detail.css';

const Detail = () => {
    return (
        <div className='detail'>
            {/* user */}
            <div className='user'>
                <img src='./avatar.png' alt='' />
                <h2>Duc Huy</h2>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>

            {/* info */}
            <div className='info'>
                <div className='option'>
                    <div className='title'>
                        <span>Shared photos</span>
                        <img src='./arrowDown.png' alt='' />
                    </div>
                    <div className='photos'>
                        <div className='photoItem'>
                            <div className='photoDetail'>
                                <img
                                    src='https://assets.goal.com/images/v3/blt8ebbaea67d2b1c54/752d38621b7815f91630c31c14716f04edbee7c5.jpg?auto=webp&format=pjpg&width=3840&quality=60'
                                    alt=''
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img
                                src='./download.png'
                                alt=''
                                className='iconDownloadImage'
                            />
                        </div>
                        <div className='photoItem'>
                            <div className='photoDetail'>
                                <img
                                    src='https://assets.goal.com/images/v3/blt8ebbaea67d2b1c54/752d38621b7815f91630c31c14716f04edbee7c5.jpg?auto=webp&format=pjpg&width=3840&quality=60'
                                    alt=''
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img
                                src='./download.png'
                                alt=''
                                className='iconDownloadImage'
                            />
                        </div>{' '}
                        <div className='photoItem'>
                            <div className='photoDetail'>
                                <img
                                    src='https://assets.goal.com/images/v3/blt8ebbaea67d2b1c54/752d38621b7815f91630c31c14716f04edbee7c5.jpg?auto=webp&format=pjpg&width=3840&quality=60'
                                    alt=''
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img
                                src='./download.png'
                                alt=''
                                className='iconDownloadImage'
                            />
                        </div>{' '}
                        <div className='photoItem'>
                            <div className='photoDetail'>
                                <img
                                    src='https://assets.goal.com/images/v3/blt8ebbaea67d2b1c54/752d38621b7815f91630c31c14716f04edbee7c5.jpg?auto=webp&format=pjpg&width=3840&quality=60'
                                    alt=''
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img
                                src='./download.png'
                                alt=''
                                className='iconDownloadImage'
                            />
                        </div>{' '}
                        <div className='photoItem'>
                            <div className='photoDetail'>
                                <img
                                    src='https://assets.goal.com/images/v3/blt8ebbaea67d2b1c54/752d38621b7815f91630c31c14716f04edbee7c5.jpg?auto=webp&format=pjpg&width=3840&quality=60'
                                    alt=''
                                />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img
                                src='./download.png'
                                alt=''
                                className='iconDownloadImage'
                            />
                        </div>
                    </div>
                </div>
                <div className='option'>
                    <div className='title'>
                        <span>Shared files</span>
                        <img src='./arrowUp.png' alt='' />
                    </div>
                </div>
            </div>

            <div className='p-[20px] flex flex-col gap-2'>
                <button className='bg-red-500 rounded-md py-2 hover:bg-red-600 transition duration-200'>
                    Block User
                </button>
                <button className='bg-blue-500 rounded-md py-2 hover:bg-blue-600 transition duration-200'>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Detail;
