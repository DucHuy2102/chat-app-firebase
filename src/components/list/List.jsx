import './list.css';
import ListChat from './listChat/ListChat';
import UserInfo from './userInfo/UserInfo';

const List = () => {
    return (
        <div className='list'>
            <UserInfo />
            <ListChat />
        </div>
    );
};

export default List;
