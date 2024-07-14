import './userInfo.css';

const UserInfo = () => {
    return (
        <div className='userInfo'>
            {/* user */}
            <div className='user'>
                <img src='./avatar.png' alt='' />
                <h2>Duc Huy</h2>
            </div>

            {/* icons */}
            <div className='icons'>
                <img src='./more.png' alt='' />
                <img src='./video.png' alt='' />
                <img src='./edit.png' alt='' />
            </div>
        </div>
    );
};

export default UserInfo;
