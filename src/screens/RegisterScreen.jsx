import React, { useState, useMemo } from 'react';
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, AppHeader, InputField, PrimaryButton } from '../components';
import { validateName, validateEmail, validatePassword, getPasswordStrength } from '../utils/validation';
import './RegisterScreen.css';

/**
 * RegisterScreen - Màn hình đăng ký tài khoản với validation thời gian thực
 * 
 * @param {Object} props
 * @param {(userData: { name: string, email: string }) => void} [props.onSuccess]
 * @param {() => void} [props.onSwitchToLogin]
 */
export default function RegisterScreen({ onSuccess, onSwitchToLogin }) {
  // 1. State quản lý giá trị form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // 2. State quản lý trạng thái touched (người dùng đã tương tác với ô nhập liệu)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  });

  // State phụ trợ: ẩn/hiện mật khẩu & loading submit
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 3. Tính toán lỗi validation từ formData
  const validationErrors = useMemo(() => {
    return {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password)
    };
  }, [formData]);

  // Trạng thái hợp lệ tổng thể của form
  const isFormValid = useMemo(() => {
    const hasValues = Boolean(formData.name.trim() && formData.email.trim() && formData.password);
    const hasNoErrors = !validationErrors.name && !validationErrors.email && !validationErrors.password;
    return hasValues && hasNoErrors;
  }, [formData, validationErrors]);

  // Tính toán độ mạnh của mật khẩu
  const passwordStrength = useMemo(() => {
    return getPasswordStrength(formData.password);
  }, [formData.password]);

  // Handler cập nhật giá trị từng trường bằng onChangeText
  const handleFieldChange = (fieldName, text) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: text
    }));
  };

  // Handler khi trường bị blur (rời khỏi ô nhập liệu)
  const handleBlur = (fieldName) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true
    }));
  };

  // Nút điền dữ liệu mẫu nhanh để kiểm tra (Demo)
  const handleFillSample = () => {
    setFormData({
      name: 'Nguyễn Hoàng Nam',
      email: 'nam.nguyen@example.com',
      password: 'StrongPassword123'
    });
    setTouched({
      name: true,
      email: true,
      password: true
    });
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e?.preventDefault();

    // Đánh dấu tất cả trường đã touch
    setTouched({
      name: true,
      email: true,
      password: true
    });

    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Giả lập gửi API đăng ký tài khoản (750ms)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      if (onSuccess) {
        onSuccess({
          name: formData.name.trim(),
          email: formData.email.trim()
        });
      }
    }, 800);
  };

  return (
    <div className="register-screen-wrapper">
      {/* Component Card #1 chứa form đăng ký */}
      <Card variant="glass" glow padding="lg" className="register-card">
        {/* Component AppHeader #1 bên trong form */}
        <AppHeader
          badge="Đăng Ký Miễn Phí"
          icon={<ShieldCheck size={18} />}
          title="Tạo Tài Khoản Mới"
          subtitle="Điền các thông tin bên dưới để bắt đầu sử dụng hệ thống bảo mật đa tầng"
          align="center"
          size="md"
        />

        <form onSubmit={handleSubmit} noValidate className="register-form">
          {/* 1. Trường Tên (Name) - Component InputField #1 */}
          <InputField
            id="register-name"
            name="name"
            label="Họ và tên"
            value={formData.name}
            onChangeText={(text) => handleFieldChange('name', text)}
            placeholder="Ví dụ: Nguyễn Văn A"
            error={touched.name ? validationErrors.name : ''}
            required
            leftIcon={<User size={18} />}
            onBlur={() => handleBlur('name')}
            helperText="Nhập đầy đủ họ và tên của bạn"
          />

          {/* 2. Trường Email - Component InputField #2 */}
          <InputField
            id="register-email"
            name="email"
            type="email"
            label="Địa chỉ Email"
            value={formData.email}
            onChangeText={(text) => handleFieldChange('email', text)}
            placeholder="tenban@company.com"
            error={touched.email ? validationErrors.email : ''}
            required
            leftIcon={<Mail size={18} />}
            onBlur={() => handleBlur('email')}
            helperText="Chúng tôi cam kết không gửi thư rác"
          />

          {/* 3. Trường Mật khẩu (Password) - Component InputField #3 */}
          <InputField
            id="register-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            value={formData.password}
            onChangeText={(text) => handleFieldChange('password', text)}
            placeholder="Tối thiểu 8 ký tự, có chữ và số..."
            error={touched.password ? validationErrors.password : ''}
            required
            leftIcon={<Lock size={18} />}
            rightElement={
              <button
                type="button"
                className="pwd-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            onBlur={() => handleBlur('password')}
          />

          {/* Thanh hiển thị độ mạnh của mật khẩu */}
          {formData.password && (
            <div className="pwd-strength-container" aria-live="polite">
              <div className="pwd-strength-header">
                <span>Độ mạnh:</span>
                <span className="pwd-strength-label" style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="pwd-strength-track">
                <div
                  className="pwd-strength-bar"
                  style={{
                    width: `${passwordStrength.percent}%`,
                    backgroundColor: passwordStrength.color
                  }}
                />
              </div>
            </div>
          )}

          {/* Trạng thái tóm tắt tính hợp lệ của form */}
          <div className={`form-status-indicator ${isFormValid ? 'is-ready' : 'is-incomplete'}`}>
            {isFormValid ? (
              <>
                <CheckCircle2 size={16} className="status-icon" />
                <span>Form hợp lệ. Sẵn sàng tạo tài khoản!</span>
              </>
            ) : (
              <span>Vui lòng điền đúng và đủ tất cả các trường để mở khóa nút Đăng ký.</span>
            )}
          </div>

          {/* Nút Submit - Component PrimaryButton #1 (tự động disabled khi form không hợp lệ) */}
          <div className="form-actions">
            <PrimaryButton
              id="submit-register-btn"
              type="submit"
              variant="primary"
              fullWidth
              disabled={!isFormValid}
              loading={isSubmitting}
              icon={<ArrowRight size={18} />}
            >
              {isSubmitting ? 'Đang tạo tài khoản...' : 'Đăng Ký Tài Khoản'}
            </PrimaryButton>
          </div>

          {/* Action phụ: Component PrimaryButton #2 điền dữ liệu mẫu */}
          <div className="form-secondary-actions">
            <PrimaryButton
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleFillSample}
              icon={<Sparkles size={16} />}
            >
              Điền Dữ Liệu Mẫu Hợp Lệ
            </PrimaryButton>
          </div>

          {/* Switch sang màn hình đăng nhập nếu đã có tài khoản */}
          {onSwitchToLogin && (
            <div className="form-switch-prompt">
              <span>Đã có tài khoản?</span>
              <button
                type="button"
                className="switch-link-btn"
                onClick={onSwitchToLogin}
              >
                Đăng nhập ngay
              </button>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}
