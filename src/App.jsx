import { useEffect } from 'react';
import {
    Chat,
    Detail,
    List,
    Login,
    Notification,
} from './components/exportComponents';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { userStore } from './lib/userStore';

const App = () => {
    const { currentUser, isLoading, fetchUserInfo } = userStore();

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
                    <Chat />
                    <Detail />
                </>
            ) : (
                <Login />
            )}
            <Notification />
        </div>
    );
};

export default App;
