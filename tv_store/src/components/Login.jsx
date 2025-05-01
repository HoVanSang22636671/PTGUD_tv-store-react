import React, { useState } from 'react';
import '../css/DangNhap.module.css';
// Đảm bảo đường dẫn đúng
import '@fortawesome/fontawesome-free/css/all.min.css';
function Login() {
    const [isActive, setIsActive] = useState(false);
    const [tk, setTk] = useState('');
    const [mk, setMk] = useState('');

    const handleLoginClick = () => setIsActive(false);
    const handleRegisterClick = () => setIsActive(true);

    const handleLogin = () => {
        if (tk === 'admin' && mk === 'admin') {
            window.location.href = 'Admin.html';
        } else {
            window.location.href = 'Home.html';
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <img src="./img/logo.png" alt="Logo" className="w-1/5" />
            </div>

            <div className={`container ${isActive ? 'active' : ''}`} id="container">
                <div className="form-container sign-up">
                    <div id="form">
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Tạo tài khoản</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                        </div>
                        <input type="text" placeholder="Tên Đăng nhập" id="tendn" /><span id="txt1">*</span>
                        <input type="email" placeholder="Email" id="email" /><span id="txt2">*</span>
                        <input type="password" placeholder="Mật khẩu" id="mk" /><span id="txt3">*</span>
                        <input type="password" placeholder="Nhập lại mật khẩu" id="nhapmk" /><span id="txt4">*</span>
                        <button id="dangky">Đăng Ký</button>
                    </div>
                </div>

                <div className="form-container sign-in">
                    <div id="form">
                        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4" >Đăng nhập</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                        </div>
                        <input type="text" placeholder="Tên đăng nhập" value={tk} onChange={e => setTk(e.target.value)} />
                        <input type="password" placeholder="Mật khẩu" value={mk} onChange={e => setMk(e.target.value)} />
                        <a href="#">Quên mật khẩu?</a>
                        <button onClick={handleLogin}>Đăng nhập</button>
                    </div>
                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1 className="text-2xl font-bold text-center text-white-800 mb-4 " >Xin chào bạn đã quay trở lại!</h1>
                            <p>Nếu bạn đã có tài khoản của chúng tôi</p>
                            <button className="hidden1" onClick={handleLoginClick} id="login">Đăng nhập ngay</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1 className="text-2xl font-bold text-center text-white-800 mb-4 ">Xin chào!</h1>
                            <p>Nếu bạn chưa có tài khoản của chúng tôi</p>
                            <button className="hidden1" onClick={handleRegisterClick} id="register">Đăng ký ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
