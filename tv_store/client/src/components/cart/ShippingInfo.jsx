import { Link } from "react-router-dom";
import LocationIcon from "../../assets/camket/dinhvi.png";
import { useState, useEffect } from "react";
import { useProduct } from "../../API/UseProvider";

function ShippingInfo() {
  const [defaultAddress, setDefaultAddress] = useState({
    name: "Nguyen Van A",
    phone: "9999999999",
    address: "Phường 4, Nguyễn Văn Bảo, Quận Gò Vấp, TP HCM",
  });
  const { account } = useProduct();

  useEffect(() => {
    if (account) {
      setDefaultAddress({
        name: account.name || "Nguyen Van A",
        phone: account.phone || "9999999999",
        address:
          account.address ||
          "Phường 4, Nguyễn Văn Bảo, Quận Gò Vấp, TP HCM",
      });
    }
  }, [account]);

  return (
    <div className="bg-white rounded-lg mx-auto w-full max-w-5xl p-5 shadow-sm">
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Thông tin giao hàng
        </h2>
        <Link to="/instantShipping">
          <span className="text-blue-600 hover:underline text-base font-medium">
            Thay đổi
          </span>
        </Link>
      </div>

      <div className="flex flex-col gap-2 text-gray-800">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <span>{defaultAddress.name}</span>
          <div className="w-px h-5 bg-gray-400 mx-1" />
          <span>{defaultAddress.phone}</span>
        </div>

        <div className="flex items-start gap-2 mt-1">
          <img src={LocationIcon} alt="location" className="w-6 mt-1" />
          <span className="text-base leading-6">
            {defaultAddress.address}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfo;
