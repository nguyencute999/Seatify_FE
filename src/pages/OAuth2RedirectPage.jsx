import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { googleLoginWithCode } from "../redux/auth/authSlice";

const OAuth2RedirectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const shownRef = useRef(false);

  useEffect(() => {
    const query = location.search;
    const params = new URLSearchParams(query);
    const code = params.get('code');
    const redirectUri = `${window.location.origin}/oauth2/redirect`;
    
    if (!code) {
      toast.error("Không lấy được mã xác thực từ Google");
      navigate("/auth");
      return;
    }

    // Dispatch Google login with code
    dispatch(googleLoginWithCode({ code, redirectUri }))
      .unwrap()
      .then(() => {
        if (!shownRef.current) {
          shownRef.current = true;
          toast.dismiss();
          toast.success("Đăng nhập thành công!");
        }
        navigate("/");
      })
      .catch((error) => {
        toast.error(error || "Đăng nhập thất bại!");
        navigate("/auth");
      });
  }, [location, navigate, dispatch]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Đang xác thực đăng nhập...</h2>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default OAuth2RedirectPage;
