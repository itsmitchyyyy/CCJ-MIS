import { colors } from '@/constants/themes';

export const token = {
  motion: false,
  colorTextQuaternary: colors.sysLight.onPrimary,
  colorTextPlaceholder: colors.sysLight.onSurfaceVariant,
  sizePopupArrow: 50,
};

export const components = {
  Button: {
    colorPrimary: colors.sysNewPrimary.newPrimary,
    colorPrimaryActive: colors.sysLight.primary,
    controlOutline: 'none',
    colorPrimaryHover: colors.sysNewPrimary.newPrimary,
    colorBgContainerDisabled: colors.sysNewPrimary.primaryContainer,
    borderRadius: 0,
  },
  Input: {
    colorBgContainer: colors.sysLight.surface,
    colorTextDisabled: colors.sysLight.onSurfaceVariant,
  },
  Checkbox: {
    colorPrimary: colors.sysNewPrimary.newPrimary,
    colorPrimaryActive: colors.sysNewPrimary.newPrimary,
    colorPrimaryHover: colors.sysNewPrimary.newPrimary,
  },
};
