import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { Card, AppHeader, InputField, PrimaryButton } from '../components';
import { validateEmail } from '../utils/validation';

/**
 * LoginScreen - Màn hình đăng nhập minh chứng tính tái sử dụng cao của 4 component
 * 
 * @param {Object} props
 * @param {() => void} props.onSwitchToRegister
 * @param {(user: { email: string }) => void} props.onLoginSuccess
 */
export default function LoginScreen({ onSwitchToRegister, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);

  const emailError = touched.email ? validateEmail(email) : '';
  const passwordError = touched.password && !password ? 'Vui lòng nhập mật khẩu' : '';

  const isFormValid = email.trim() !== '' && !validateEmail(email) && password.trim() !== '';

  const handleLogin = (e) => {
    e?.preventDefault();
    setTouched({ email: true, password: true });

    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess({ email });
      }
    }, 700);
  };

  return (
    <div className="login-screen-wrapper" style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
      {/* Component Card tái sử dụng */}
      <Card variant="glass" glow padding="lg">
        {/* Component AppHeader tái sử dụng */}
        <AppHeader
          badge="Xác Thực Thành Viên"
          icon={<LogIn size={18} />}
          title="Đăng Nhập Hệ Thống"
          subtitle="Chào mừng trở lại! Vui lòng nhập thông tin đăng nhập của bạn"
          align="center"
          size="md"
        />

        <form onSubmit={handleLogin} noValidate>
          {/* Component InputField tái sử dụng cho Email */}
          <InputField
            id="login-email"
            name="email"
            type="email"
            label="Địa chỉ Email"
            value={email}
            onChangeText={setEmail}
            placeholder="tenban@company.com"
            error={emailError}
            required
            leftIcon={<Mail size={18} />}
            onBlur={() => setTouched((p) => ({ ...p, email: true }))}
          />

          {/* Component InputField tái sử dụng cho Password */}
          <InputField
            id="login-password"
            name="password"
            type="password"
            label="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            error={passwordError}
            required
            leftIcon={<Lock size={18} />}
            onBlur={() => setTouched((p) => ({ ...p, password: true }))}
          />

          <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
            {/* Component PrimaryButton tái sử dụng (hỗ trợ disabled) */}
            <PrimaryButton
              type="submit"
              variant="primary"
              fullWidth
              disabled={!isFormValid}
              loading={isLoading}
              icon={<LogIn size={18} />}
            >
              {isLoading ? 'Đang xác thực...' : 'Đăng Nhập'}
            </PrimaryButton>
          </div>

          <div>
            {/* Component PrimaryButton tái sử dụng (variant outline) */}
            <PrimaryButton
              type="button"
              variant="secondary"
              fullWidth
              onClick={onSwitchToRegister}
              icon={<ArrowLeft size={16} />}
            >
              Chưa có tài khoản? Quay lại Đăng ký
            </PrimaryButton>
          </div>
        </form>
      </Card>
    </div>
  );
}
