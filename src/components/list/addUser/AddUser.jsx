import './addUser.css';

const AddUser = () => {
    const handleAddNewUser = (e) => {
        e.preventDefault();
    };

    return (
        <div className='addUser'>
            <form onSubmit={handleAddNewUser}>
                <input type='text' placeholder='Username' name='username' />
                <button>Search</button>
            </form>

            <div className='user'>
                <div className='detail'>
                    <img src='./avatar.png' alt='' />
                    <span>Duc Huy</span>
                </div>
                <button>Add User</button>
            </div>
        </div>
    );
};

export default AddUser;
