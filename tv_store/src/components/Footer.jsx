import React from "react";

const Footer = () => {
  return (
    <footer className="w-screen bg-[#e4e7ec] py-6">
      <div className="flex flex-row justify-between items-start gap-x-12 px-10">
        {/* Các danh mục - Căn full màn hình */}
        <div className="flex justify-between w-2/3">
          {/* Theo dõi */}
          <div className="w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Theo dõi chúng tôi</h2>
            <ul className="space-y-2 text-sm">
              {["Facebook", "Instagram", "Twitter", "Youtube"].map((platform, index) => (
                <li key={index} className="flex items-center gap-2 hover:text-orange-500 transition">
                  <i className={`fab fa-${platform.toLowerCase()}`}></i> {platform}
                </li>
              ))}
            </ul>
          </div>
{/*  */}
          {/* Hỗ trợ khách hàng */}
          <div className="w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Hỗ trợ khách hàng</h2>
            <ul className="space-y-2 text-sm">
              {["Chăm sóc khách hàng", "Thanh toán", "Hướng dẫn mua hàng"].map((item, index) => (
                <li key={index} className="hover:text-orange-500 transition">{item}</li>
              ))}
            </ul>
          </div>

          {/* Chính sách */}
          <div className="w-full">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Chính sách</h2>
            <ul className="space-y-2 text-sm">
              {["Chế độ bảo hành", "Chính sách đổi hàng", "Bảo mật thông tin", "Chính sách giao nhận"].map((policy, index) => (
                <li key={index} className="hover:text-orange-500 transition">{policy}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bản đồ + Liên hệ */}
        <div className="flex items-center gap-x-12 w-1/3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5251949932634!2d106.68579907484486!3d10.846438657720279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528ffb2e99823%3A0x3ec7c020d5d56426!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBOZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1714450897054!5m2!1svi!2s"
            width="450"
            height="150"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
          <div className="text-sm font-semibold text-gray-500">
            <p>📍 Địa chỉ: Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, TP.HCM.</p>
            <p className="mt-2">📞 Số điện thoại: 0999999999</p>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="border-t border-gray-400 text-center py-2 text-sm mt-4">
        <p>©CopyRight <span className="font-bold"></span> 2025</p>
      </div>
    </footer>
  );
};

export default Footer;