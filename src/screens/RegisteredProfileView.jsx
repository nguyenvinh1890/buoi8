import React from 'react';
import { UserCheck, Shield, CheckCircle, Mail, User, RotateCcw } from 'lucide-react';
import { Card, AppHeader, PrimaryButton } from '../components';

/**
 * RegisteredProfileView - Component hiển thị thông tin sau khi đăng ký thành công
 * 
 * @param {Object} props
 * @param {{ name: string, email: string }} props.userData
 * @param {() => void} props.onReset
 */
export default function RegisteredProfileView({ userData, onReset }) {
  return (
    <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
      {/* Component Card tái sử dụng */}
      <Card variant="glass" glow padding="lg">
        {/* Component AppHeader tái sử dụng */}
        <AppHeader
          badge="Đăng Ký Thành Công"
          icon={<CheckCircle size={18} color="#10b981" />}
          title="Chào Mừng Thành Viên Mới!"
          subtitle="Tài khoản của bạn đã được khởi tạo thành công với chứng thực bảo mật"
          align="center"
          size="md"
        />

        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.1rem',
              color: '#ffffff'
            }}>
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Họ và tên</div>
              <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>{userData.name}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-light)'
            }}>
              <Mail size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Địa chỉ Email</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>{userData.email}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399'
            }}>
              <Shield size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Trạng thái tài khoản</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#34d399' }}>Đã xác thực & Sẵn sàng</div>
            </div>
          </div>
        </div>

        {/* Component PrimaryButton tái sử dụng */}
        <PrimaryButton
          type="button"
          variant="primary"
          fullWidth
          onClick={onReset}
          icon={<RotateCcw size={16} />}
        >
          Tạo Tài Khoản Khác (Reset Form)
        </PrimaryButton>
      </Card>
    </div>
  );
}
