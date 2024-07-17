import { useEffect } from 'react';
import { Chat, Detail, List, Login, Notification } from './components/exportComponents';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { userStore } from './lib/userStore';
import { chatStore } from './lib/chatStore';

const App = () => {
    const { currentUser, isLoading, fetchUserInfo } = userStore();
    const { chatId } = chatStore();

    useEffect(() => {
        const unSubmit = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid);
        });

        return () => {
            unSubmit();
        };
    }, [fetchUserInfo]);

    if (isLoading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className='container'>
            {currentUser ? (
                <>
                    <List />
                    {chatId && <Chat />}
                    {chatId && <Detail />}
                </>
            ) : (
                <Login />
            )}
            <Notification />
        </div>
    );
};

export default App;
