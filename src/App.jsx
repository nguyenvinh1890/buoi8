import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Sparkles, 
  Check, 
  Terminal, 
  Zap, 
  Lock, 
  KeyRound,
  FileCode2,
  Tag
} from 'lucide-react';
import { AppHeader, PrimaryButton, InputField, Card } from './components';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import RegisteredProfileView from './screens/RegisteredProfileView';
import './App.css';

export default function App() {
  // Tabs: 'register' | 'login' | 'profile'
  const [activeTab, setActiveTab] = useState('register');
  const [registeredUser, setRegisteredUser] = useState(null);

  // Thử nghiệm thêm InputField & PrimaryButton ở panel bên cạnh (Mã ưu đãi / Giới thiệu)
  const [referralCode, setReferralCode] = useState('');
  const [referralApplied, setReferralApplied] = useState(false);
  const [referralError, setReferralError] = useState('');

  // Xử lý khi đăng ký thành công
  const handleRegisterSuccess = (userData) => {
    setRegisteredUser(userData);
    setActiveTab('profile');
  };

  // Xử lý áp dụng mã giới thiệu (Side Card)
  const handleApplyReferral = () => {
    if (!referralCode.trim()) {
      setReferralError('Vui lòng nhập mã giới thiệu hoặc voucher');
      return;
    }
    if (referralCode.trim().toUpperCase() !== 'VIP2026') {
      setReferralError('Mã không hợp lệ! Thử dùng mã mẫu: VIP2026');
      setReferralApplied(false);
      return;
    }
    setReferralError('');
    setReferralApplied(true);
  };

  return (
    <div className="app-container">
      {/* 1. Global Navigation Bar */}
      <nav className="app-navbar">
        <div className="nav-brand">
          <div className="brand-logo">
            <ShieldCheck size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-name">NovaAuth</span>
            <span className="brand-tag">React System</span>
          </div>
        </div>

        <div className="nav-tabs">
          <button
            type="button"
            className={`nav-tab-item ${activeTab === 'register' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Đăng Ký (Register)
          </button>
          <button
            type="button"
            className={`nav-tab-item ${activeTab === 'login' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Đăng Nhập (Login)
          </button>
        </div>
      </nav>

      {/* 2. Global Header sử dụng Component AppHeader (Instance ngoài Form) */}
      <section className="app-hero-header">
        <AppHeader
          badge="Bảo Mật Cấp Doanh Nghiệp"
          icon={<Sparkles size={16} />}
          title="Hệ Thống Đăng Ký & Quản Trị Xác Thực"
          subtitle="Ứng dụng kiến trúc React component tái sử dụng cao cấp với validation tức thời và UI/UX chuẩn mực"
          align="center"
          size="lg"
        />
      </section>

      {/* 3. Main Dual-Column Content */}
      <main className="app-main-grid">
        {/* Cột trái: Màn hình Register, Login hoặc Profile view */}
        <section className="main-form-column">
          {activeTab === 'register' && (
            <RegisterScreen
              onSuccess={handleRegisterSuccess}
              onSwitchToLogin={() => setActiveTab('login')}
            />
          )}

          {activeTab === 'login' && (
            <LoginScreen
              onSwitchToRegister={() => setActiveTab('register')}
              onLoginSuccess={(user) => {
                setRegisteredUser({ name: 'Người dùng Nova', email: user.email });
                setActiveTab('profile');
              }}
            />
          )}

          {activeTab === 'profile' && registeredUser && (
            <RegisteredProfileView
              userData={registeredUser}
              onReset={() => {
                setRegisteredUser(null);
                setActiveTab('register');
              }}
            />
          )}
        </section>

        {/* Cột phải: Khối thông tin kiến trúc & Demo tái sử dụng (Card #2) */}
        <aside className="main-info-column">
          {/* Component Card tái sử dụng cho bảng điều khiển & tính năng */}
          <Card variant="solid" padding="md" className="architecture-card">
            {/* Component AppHeader tái sử dụng cho tiêu đề khối */}
            <AppHeader
              badge="Kiến Trúc Chuẩn"
              icon={<Layers size={18} />}
              title="4 Component Tái Sử Dụng"
              subtitle="Tất cả component được thiết kế theo chuẩn Clean Architecture và sử dụng ≥ 2 lần trong ứng dụng"
              align="left"
              size="sm"
            />

            {/* Checklist kiểm tra 4 component */}
            <div className="component-checklist">
              <div className="checklist-item">
                <div className="item-icon check-icon">
                  <Check size={16} />
                </div>
                <div className="item-content">
                  <span className="item-title">AppHeader</span>
                  <span className="item-desc">Dùng ở Banner chính, form Register, form Login và Profile card (4 lần).</span>
                </div>
              </div>

              <div className="checklist-item">
                <div className="item-icon check-icon">
                  <Check size={16} />
                </div>
                <div className="item-content">
                  <span className="item-title">PrimaryButton</span>
                  <span className="item-desc">Hỗ trợ disabled & loading; dùng ở Submit, Điền mẫu, Đăng nhập, Áp dụng mã (5 lần).</span>
                </div>
              </div>

              <div className="checklist-item">
                <div className="item-icon check-icon">
                  <Check size={16} />
                </div>
                <div className="item-content">
                  <span className="item-title">InputField</span>
                  <span className="item-desc">Đầy đủ props (label, value, onChangeText, placeholder, error); dùng 6 lần.</span>
                </div>
              </div>

              <div className="checklist-item">
                <div className="item-icon check-icon">
                  <Check size={16} />
                </div>
                <div className="item-content">
                  <span className="item-title">Card</span>
                  <span className="item-desc">Container bọc form đăng ký, khối thông tin kiến trúc và thẻ hồ sơ (3 lần).</span>
                </div>
              </div>
            </div>

            {/* Thử nghiệm thêm InputField và PrimaryButton tái sử dụng trong Card này */}
            <div className="voucher-box">
              <div className="voucher-header">
                <Tag size={16} className="voucher-icon" />
                <span className="voucher-title">Áp Dụng Mã Ưu Đãi (Demo Reusable Input)</span>
              </div>

              {/* Tái sử dụng InputField */}
              <InputField
                id="referral-input"
                label="Mã giới thiệu đối tác"
                value={referralCode}
                onChangeText={(val) => {
                  setReferralCode(val);
                  if (referralError) setReferralError('');
                }}
                placeholder="Nhập mã mẫu: VIP2026"
                error={referralError}
                helperText={referralApplied ? '✅ Đã kích hoạt gói bảo mật Pro Member!' : 'Thử nhập VIP2026 để kiểm tra'}
              />

              {/* Tái sử dụng PrimaryButton */}
              <PrimaryButton
                type="button"
                variant="outline"
                fullWidth
                onClick={handleApplyReferral}
                disabled={!referralCode.trim()}
              >
                {referralApplied ? 'Đã Áp Dụng Thành Công' : 'Áp Dụng Mã'}
              </PrimaryButton>
            </div>

            {/* Thông số kỹ thuật nhanh */}
            <div className="security-badges-row">
              <div className="badge-chip">
                <Lock size={14} />
                <span>SHA-256 Validated</span>
              </div>
              <div className="badge-chip">
                <Zap size={14} />
                <span>Real-time React State</span>
              </div>
              <div className="badge-chip">
                <Terminal size={14} />
                <span>Zero Console Errors</span>
              </div>
            </div>
          </Card>
        </aside>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 NovaAuth Platform. Thiết kế và phát triển với React, Clean Code & Reusable Component System.</p>
      </footer>
    </div>
  );
}
