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

const App = () => {
    const user = false;

    useEffect(() => {
        const unSubmit = onAuthStateChanged(auth, (user) => {
            console.log(user);
        });

        return () => {
            unSubmit();
        };
    }, []);

    return (
        <div className='container'>
            {user ? (
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
