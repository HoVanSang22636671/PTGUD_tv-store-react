import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="w-full bg-[#e4e7ec] py-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 px-6 md:px-10 max-w-[1200px] mx-auto">
        {/* Các danh mục */}
        <div className="flex flex-col sm:flex-row justify-between w-full md:w-2/3 gap-6">
          {/* Theo dõi */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Theo dõi chúng tôi</h2>
            <ul className="space-y-2 text-sm">
              {["Facebook", "Instagram", "Twitter", "Youtube"].map((platform, index) => (
                <li key={index} className="flex items-center gap-2 hover:text-orange-500 transition">
                  <i className={`fab fa-${platform.toLowerCase()}`}></i> {platform}
                </li>
              ))}
            </ul>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Hỗ trợ khách hàng</h2>
            <ul className="space-y-2 text-sm">
              {["Chăm sóc khách hàng", "Thanh toán", "Hướng dẫn mua hàng"].map((item, index) => (
                <li key={index} className="hover:text-orange-500 transition">{item}</li>
              ))}
            </ul>
          </div>

          {/* Chính sách */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Chính sách</h2>
            <ul className="space-y-2 text-sm">
              {["Chế độ bảo hành", "Chính sách đổi hàng", "Bảo mật thông tin", "Chính sách giao nhận"].map((policy, index) => (
                <li key={index} className="hover:text-orange-500 transition">{policy}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bản đồ + Liên hệ */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <iframe
            className="w-full h-[200px] rounded-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5251949932634!2d106.68579907484486!3d10.846438657720279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ffb2e99823%3A0x3ec7c020d5d56426!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBOZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1714450897054!5m2!1svi!2s"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="text-sm font-semibold text-gray-600">
            <p>📍 Địa chỉ: Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP.HCM.</p>
            <p className="mt-2">📞 Số điện thoại: 0999999999</p>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="border-t border-gray-400 text-center py-2 text-sm mt-6">
        <p>© CopyRight <span className="font-bold">TVStore</span> 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
