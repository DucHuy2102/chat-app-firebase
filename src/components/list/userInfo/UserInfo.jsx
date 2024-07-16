import './userInfo.css';
import { userStore } from '../../../lib/userStore';

const UserInfo = () => {
    const { currentUser } = userStore();
    console.log(currentUser);

    return (
        <div className='userInfo'>
            {/* user */}
            <div className='user'>
                <img
                    src={currentUser ? currentUser.avatar : './avatar.png'}
                    alt=''
                />
                <h2>{currentUser.username}</h2>
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
