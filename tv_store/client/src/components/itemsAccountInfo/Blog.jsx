import React, { Component } from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

class Blog extends Component {
  render() {
    const articles = [
      {
        title: "Review Tivi LG OLED G3 - Đánh giá chi tiết",
        date: "15/03/2025",
        author: "Admin",
        image:
          "https://www.lg.com/vn/images/tvs/md07523584/gallery/medium01.jpg",
        excerpt:
          "Đánh giá chi tiết về dòng Tivi LG OLED G3, nổi bật với công nghệ hiển thị vượt trội, âm thanh sống động và thiết kế siêu mỏng...",
      },
      {
        title: "5 mẹo sử dụng tivi thông minh hiệu quả",
        date: "12/03/2025",
        author: "Nguyễn Văn A",
        image:
          "https://cdn.tgdd.vn/Files/2021/09/17/1384611/meo-su-dung-tivi-thong-minh-samsung-android-sony-tcl-lg-1-120921-110505-800-resize.jpg",
        excerpt:
          "Những mẹo giúp bạn tối ưu hóa trải nghiệm khi dùng tivi thông minh, từ việc cài đặt đến tiết kiệm điện năng...",
      },
      {
        title: "Samsung Neo QLED 8K có gì mới?",
        date: "10/03/2025",
        author: "Trần Bảo",
        image:
          "https://www.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMAGE_600x600.png", // bạn có thể thay bằng ảnh phù hợp hơn
        excerpt:
          "Samsung Neo QLED 8K ra mắt với công nghệ hình ảnh tiên tiến, AI nâng cấp chất lượng video và khả năng điều khiển thông minh...",
      },
      {
        title: "So sánh Google TV và WebOS - Nên chọn nền tảng nào?",
        date: "08/03/2025",
        author: "Lê Minh",
        image:
          "https://i.ytimg.com/vi/KN7N8zCzSuY/maxresdefault.jpg",
        excerpt:
          "Bài viết phân tích ưu và nhược điểm giữa hai nền tảng Google TV và WebOS, giúp bạn chọn tivi thông minh phù hợp nhất...",
      },
    ];

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Tin tức công nghệ tivi</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-lg bg-white"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-4">{article.title}</h2>
              <div className="text-gray-500 flex items-center text-sm mt-2">
                <FaCalendarAlt className="mr-2" /> {article.date} &nbsp; | &nbsp;
                <FaUser className="mr-2" /> {article.author}
              </div>
              <p className="text-gray-600 mt-2">{article.excerpt}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Đọc thêm
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Blog;
