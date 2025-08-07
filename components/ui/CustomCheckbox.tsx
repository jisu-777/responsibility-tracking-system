import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | number; // 크기 옵션
  borderWidth?: number; // 테두리 굵기 (픽셀)
  borderColor?: string; // 기본 테두리 색깔
  checkedColor?: string; // 체크된 상태 색깔
}

export default function CustomCheckbox({
  checked,
  onChange,
  disabled = false,
  className = '',
  size = 'sm',
  borderWidth = 3, // 기본 굵기 3px
  borderColor = '#D1D5DB', // 기본 테두리 색깔 (브랜드 그레이 300)
  checkedColor = '#FF6B35', // 체크된 상태 색깔 (브랜드 300)
}: CustomCheckboxProps) {
  // 크기 계산 함수
  const getSizeStyles = () => {
    if (typeof size === 'number') {
      return {
        width: `${size}px`,
        height: `${size}px`,
        checkWidth: `${Math.max(size * 0.4, 8)}px`,
        checkMarginLeft: `${Math.max(size * 0.35, 6)}px`,
      };
    }
    
    switch (size) {
      case 'sm':
        return { width: '24px', height: '24px', checkWidth: '10px', checkMarginLeft: '8px' };
      case 'lg':
        return { width: '48px', height: '48px', checkWidth: '18px', checkMarginLeft: '16px' };
      case 'md':
      default:
        return { width: '35px', height: '35px', checkWidth: '14px', checkMarginLeft: '12px' };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <div className={`checkbox-wrapper ${className}`}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <span className="checkbox"></span>
      </label>
      
      <style jsx>{`
        .checkbox-wrapper *,
        .checkbox-wrapper *::before,
        .checkbox-wrapper *::after {
          box-sizing: border-box;
        }

        .checkbox-wrapper label {
          display: block;
          width: ${sizeStyles.width};
          height: ${sizeStyles.height};
          cursor: pointer;
        }

        .checkbox-wrapper input {
          visibility: hidden;
          display: none;
        }

        .checkbox-wrapper input:checked ~ .checkbox {
          transform: rotate(45deg);
          width: ${sizeStyles.checkWidth};
          margin-left: ${sizeStyles.checkMarginLeft};
          border-color: ${checkedColor};
          border-top-color: transparent;
          border-left-color: transparent;
          border-radius: 0;
        }

        .checkbox-wrapper .checkbox {
          display: block;
          width: inherit;
          height: inherit;
          border: ${borderWidth}px solid ${borderColor};
                   border-radius: 6px;
         transition: all 0.2s;
        }

        .checkbox-wrapper input:disabled ~ .checkbox {
          opacity: 0.5;
          cursor: not-allowed;
        }

                 .checkbox-wrapper label:hover .checkbox {
           border-color: #9CA3AF;
         }

        .checkbox-wrapper input:checked ~ .checkbox {
          border-color: ${checkedColor};
          border-top-color: transparent;
          border-left-color: transparent;
        }
      `}</style>
    </div>
  );
} 