import { createStyles, useTheme } from "antd-style";

// hooks
export default function useModalStyle() {
  const token = useTheme();
  const useStyle = createStyles(({ token }) => ({
    "my-modal-mask": {
      boxShadow: `inset 0 0 15px #fff`,
    },
    "my-modal-header": {
      // borderBottom: `1px dotted ${token.colorPrimary}`,
      textAlign: "center",
      opacity: "0",
    },
    "my-modal-footer": {
      color: token.colorPrimary,
    },
    "my-modal-content": {
      border: "1px solid #333",
    },
  }));
  const { styles } = useStyle();
  const classNames = {
    mask: styles["my-modal-mask"],
    header: styles["my-modal-header"],
    footer: styles["my-modal-footer"],
    content: styles["my-modal-content"],
  };
  const modalStyles = {
    header: {
      borderLeft: `5px solid ${token.colorPrimary}`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    body: {
      // boxShadow: "inset 0 0 5px #999",
      borderRadius: 5,
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
    footer: {
      borderTop: "1px solid #333",
    },
    content: {
      boxShadow: "0 0 30px #999",
    },
  };
  return {
    classNames,
    modalStyles,
  };
}
