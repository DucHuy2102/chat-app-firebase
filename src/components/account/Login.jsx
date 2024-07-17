import { useState } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';

const Login = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [avatar, setAvatar] = useState({ file: null, url: '' });
    const [loading, setLoading] = useState(false);

    const handleSetAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    // =============================== Login ================================
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
            toast.error('Failed to login');
        } finally {
            setLoading(false);
        }
    };

    // ============================== Register ==============================
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const imgURL = await upload(avatar.file);

            await setDoc(doc(db, 'users', res.user.uid), {
                username,
                email,
                avatar: imgURL,
                id: res.user.uid,
                blocked: [],
            });

            await setDoc(doc(db, 'userChats', res.user.uid), {
                chat: [],
            });

            toast.success('Successfully registered!');
        } catch (error) {
            console.log(error);
            toast.error('Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full flex bg-gray-100 rounded-md'>
            {/* login */}
            {showRegister ? (
                <div className='flex-1 flex flex-col justify-center items-center p-10 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-300 rounded-l-md'>
                    <span className='text-4xl font-bold text-white mb-4'>
                        Welcome to {showRegister ? 'Register' : 'Login'}
                    </span>
                    {showRegister ? (
                        <span className='text-lg text-white mb-6'>Already have an account?</span>
                    ) : (
                        <span className='text-lg text-white mb-6'>Don&apos;t have an account?</span>
                    )}
                    <button
                        onClick={() => setShowRegister(!showRegister)}
                        className='w-40 bg-white text-indigo-600 text-xl font-medium px-5 py-3 rounded-full border-2 border-white hover:bg-indigo-600 hover:text-white transition duration-200'
                    >
                        {showRegister ? 'Login' : 'Register'}
                    </button>
                </div>
            ) : (
                <div className='flex-1 flex flex-col justify-center items-center bg-white p-10 rounded-l-md '>
                    <div className='w-[80%] flex justify-between items-center mb-8'>
                        <span className='text-3xl font-semibold text-gray-800'>Sign in</span>
                        <div className='flex gap-4'>
                            <FaFacebookF
                                size={40}
                                className='text-blue-600 border border-gray-300 p-2 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-200'
                            />
                            <FaGoogle
                                size={40}
                                className='text-red-600 border border-gray-300 p-2 rounded-full cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-200'
                            />
                        </div>
                    </div>
                    <form onSubmit={handleLogin} className='w-[80%] mx-auto'>
                        <div className='w-full flex flex-col gap-1 mb-4'>
                            <label className='text-lg font-medium text-gray-700'>Email</label>
                            <input
                                name='email'
                                type='text'
                                placeholder='Email'
                                className='text-black w-full px-4 py-2 rounded-md text-lg bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none transition duration-150'
                            />
                        </div>
                        <div className='w-full flex flex-col gap-1 mb-6'>
                            <label className='text-lg font-medium text-gray-700'>Password</label>
                            <input
                                name='password'
                                type='password'
                                placeholder='Password'
                                className='text-black w-full px-4 py-2 rounded-md text-lg bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none transition duration-150'
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full bg-indigo-600 text-white py-2 rounded-md text-lg font-bold hover:bg-indigo-700 transition duration-200'
                        >
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                    </form>
                    <div className='w-[80%] flex justify-between items-center mt-6 text-gray-700'>
                        <div className='flex items-center gap-2'>
                            <input
                                id='remember'
                                type='checkbox'
                                className='form-checkbox h-4 w-4 text-indigo-600'
                            />
                            <label htmlFor='remember' className='text-lg'>
                                Remember me
                            </label>
                        </div>
                        <span className='text-lg cursor-pointer hover:underline'>
                            Forgot Password?
                        </span>
                    </div>
                </div>
            )}

            {/* slider */}
            {showRegister ? (
                ''
            ) : (
                <div className='flex-1 flex flex-col justify-center items-center p-10 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-300 rounded-r-md'>
                    <span className='text-4xl font-bold text-white mb-4'>
                        Welcome to {showRegister ? 'Register' : 'Login'}
                    </span>
                    {showRegister ? (
                        <span className='text-lg text-white mb-6'>Already have an account?</span>
                    ) : (
                        <span className='text-lg text-white mb-6'>Don&apos;t have an account?</span>
                    )}
                    <button
                        onClick={() => setShowRegister(!showRegister)}
                        className='w-40 bg-white text-indigo-600 text-xl font-medium px-5 py-3 rounded-full border-2 border-white hover:bg-indigo-600 hover:text-white transition duration-200'
                    >
                        {showRegister ? 'Login' : 'Register'}
                    </button>
                </div>
            )}

            {/* register */}
            {showRegister && (
                <div className='flex-1 flex flex-col justify-center items-center bg-white p-10 rounded-r-md'>
                    <div className='w-[80%] flex justify-between items-center mb-8'>
                        <span className='text-3xl font-semibold text-gray-800'>Sign Up</span>
                        <div className='flex gap-4 rounded-full'>
                            <label htmlFor='avatar'>
                                <img
                                    src={avatar.url || './avatar.png'}
                                    alt=''
                                    className='rounded-full h-20 w-20 object-cover cursor-pointer hover:opacity-70 transition duration-200'
                                />
                            </label>
                            <input
                                type='file'
                                id='avatar'
                                onChange={handleSetAvatar}
                                className='hidden'
                            />
                        </div>
                    </div>
                    <form onSubmit={handleRegister} className='w-[80%] mx-auto'>
                        <div className='w-full flex flex-col gap-1 mb-4'>
                            <label className='text-lg font-medium text-gray-700'>Username</label>
                            <input
                                name='username'
                                type='text'
                                placeholder='Username'
                                className='text-black w-full px-4 py-2 rounded-md text-lg bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none transition duration-150'
                            />
                        </div>
                        <div className='w-full flex flex-col gap-1 mb-4'>
                            <label className='text-lg font-medium text-gray-700'>Email</label>
                            <input
                                name='email'
                                type='text'
                                placeholder='Email'
                                className='text-black w-full px-4 py-2 rounded-md text-lg bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none transition duration-150'
                            />
                        </div>
                        <div className='w-full flex flex-col gap-1 mb-6'>
                            <label className='text-lg font-medium text-gray-700'>Password</label>
                            <input
                                name='password'
                                type='password'
                                placeholder='Password'
                                className='text-black w-full px-4 py-2 rounded-md text-lg bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none transition duration-150'
                            />
                        </div>
                        <button
                            disabled={loading}
                            type='submit'
                            className={`w-full text-white py-2 rounded-md text-lg font-bold transition duration-200 ${
                                loading
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                        >
                            {loading ? 'Loading...' : 'Register'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;
