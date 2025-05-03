import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link,useNavigate } from 'react-router-dom';
import { useProduct } from '../API/UseProvider'; // Import useProduct từ UseProvider.jsx
function Login() {
    const [isActive, setIsActive] = useState(false);
    const [tk, setTk] = useState('');
    const [mk, setMk] = useState('');
    const navigate = useNavigate();
    const handleLoginClick = () => setIsActive(false);
    const handleRegisterClick = () => setIsActive(true);
    const {login} = useProduct(); // Giả sử bạn đã định nghĩa hàm login trong UseProvider.jsx
    const handleLogin = () => {
        const success = login(tk, mk);
        if (success) {
          navigate('/'); // điều hướng khi đăng nhập thành công
        } else {
          alert('Sai tài khoản hoặc mật khẩu');
        }
      };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-indigo-200 flex flex-col items-center justify-center font-[Montserrat]">
            <div className="mb-4 justify-between">

                <div>
                    <Link to="/">
                        <img
                            src="/img/logo.png"
                            alt="Logo"
                            className="block w-[130px] rounded-full cursor-pointer pl-5"
                        />
                    </Link>
                </div>
            </div>

            {/* Container chính */}
            <div className={`relative w-[768px] max-w-full min-h-[480px] bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden transition-all duration-500 ${isActive ? 'translate-x-0' : ''}`}>
                {/* Sign Up Form */}
                <div className={`absolute w-1/2 h-full top-0 left-0 flex flex-col items-center justify-center px-10 transition-all duration-700 ${isActive ? 'translate-x-full opacity-0 z-0' : 'translate-x-0 opacity-100 z-10'}`}>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Đăng nhập</h1>
                    <div className="my-4">
                        <a href="#" className="border border-gray-300 rounded-full p-2 mx-1 inline-flex items-center justify-center w-10 h-10">
                            <i className="fab fa-google-plus-g"></i>
                        </a>
                        <a href="#" className="border border-gray-300 rounded-full p-2 mx-1 inline-flex items-center justify-center w-10 h-10">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </div>
                    <input
                        type="text"
                        placeholder="Tên đăng nhập"
                        value={tk}
                        onChange={(e) => setTk(e.target.value)}
                        className="bg-gray-200 rounded-lg px-4 py-2 my-2 w-full text-sm focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={mk}
                        onChange={(e) => setMk(e.target.value)}
                        className="bg-gray-200 rounded-lg px-4 py-2 my-2 w-full text-sm focus:outline-none"
                    />
                    <a href="#" className="text-sm text-gray-600 my-2">Quên mật khẩu?</a>
                    <button
                        onClick={handleLogin}
                        className="bg-[#3d4c64] text-white font-semibold text-xs uppercase px-10 py-2 rounded-lg hover:bg-[#32425a] mt-2 cursor-pointer"
                    >
                        Đăng nhập
                    </button>
                </div>

                {/* Sign In Form */}
                <div className={`absolute w-1/2 h-full top-0 left-1/2 flex flex-col items-center justify-center px-10 transition-all duration-700 ${isActive ? 'translate-x-0 opacity-100 z-10' : 'translate-x-[-100%] opacity-0 z-0'}`}>
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Tạo tài khoản</h1>
                    <div className="my-4">
                        <a href="#" className="border border-gray-300 rounded-full p-2 mx-1 inline-flex items-center justify-center w-10 h-10">
                            <i className="fab fa-google-plus-g"></i>
                        </a>
                        <a href="#" className="border border-gray-300 rounded-full p-2 mx-1 inline-flex items-center justify-center w-10 h-10">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </div>
                    <input type="text" placeholder="Tên đăng nhập" className="bg-gray-200 rounded-lg px-4 py-2 my-2 w-full text-sm focus:outline-none" />
                    <span className="text-xs">*</span>
                    <input type="email" placeholder="Email" className="bg-gray-200 rounded-lg px-4 py-2 my-2 w-full text-sm focus:outline-none" />
                    <span className="text-xs">*</span>
                    <input type="password" placeholder="Mật khẩu" className="bg-gray-200 rounded-lg px-4 py-2 my-2 w-full text-sm focus:outline-none" />
                    <span className="text-xs">*</span>
                    <input type="password" placeholder="Nhập lại mật khẩu" className="bg-gray-200 rounded-lg px-4 py-2 my-2 w-full text-sm focus:outline-none" />
                    <span className="text-xs">*</span>
                    <button
                        className="bg-[#3d4c64] text-white font-semibold text-xs uppercase px-10 py-2 rounded-lg hover:bg-[#32425a] mt-2 cursor-pointer"
                    >
                        Đăng ký
                    </button>
                </div>

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-indigo-500 to-indigo-800 text-white flex items-center justify-center transition-transform duration-700 ${isActive ? '-translate-x-full' : ''}`}>
                        <div className="text-center px-8">
                            <h1 className="text-2xl font-bold mb-4">{isActive ? 'Xin chào bạn đã quay trở lại!' : 'Xin chào!'}</h1>
                            <p className="text-sm mb-2">
                                {isActive ? 'Nếu bạn đã có tài khoản của chúng tôi' : 'Nếu bạn chưa có tài khoản của chúng tôi'}
                            </p>
                            <button
                                onClick={isActive ? handleLoginClick : handleRegisterClick}
                                className="mt-2 px-8 py-2 border border-white text-white rounded-lg text-sm uppercase cursor-pointer"
                            >
                                {isActive ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
