import React, { useState, useEffect } from "react";
import "../../pages/User/ThongTinNguoiDung/ControlInfor.css";
import "./ThemDiaChi.css";
import axios from "axios";

const ThemDiaChi = ({ accessToken, setIsAddAddressOpen }) => {
  const [diachi, setDiachi] = useState("");
  const Swal = require("sweetalert2");
  const [isSaving, setIsSaving] = useState(false);

  console.log(diachi);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await axios.put(
        "http://localhost:8000/user/address",
        {
          address: diachi,
        },
        {
          headers: { token: `Bearer ${accessToken}` },
        }
      );
      setDiachi("");
      Swal.fire({
        text: "Thêm địa chỉ thành công",
        icon: "success",
      });
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    } finally {
      setIsSaving(false);
      setIsAddAddressOpen(false);
    }
  };

  const handleClose = () => {
    setIsAddAddressOpen(false);
  };

  return (
    <div className="add-addressFields">
      <h1>THÊM ĐỊA CHỈ</h1>
      <form onSubmit={handleSubmit}>
        <div className="choseSelect">
          <label>
            Địa chỉ chi tiết:
            <textarea
              name="diaChiChiTiet"
              value={diachi}
              onChange={(e) => setDiachi(e.target.value)}
            />
          </label>
        </div>
        <div className="bot-btn">
          <button className="bottomBTN" type="submit">
            {isSaving ? "Đang Lưu....." : "Lưu"}
          </button>
          <button className="bottomBTN" type="button" onClick={handleClose}>
            Đóng
          </button>
        </div>
      </form>
    </div>
  );
};

export default ThemDiaChi;
