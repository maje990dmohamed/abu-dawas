import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ErrorTooltip = styled(({ className, ...props }: any) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    placement="bottom"
    arrow
    open={!!props.title}
    PopperProps={{
      modifiers: [
        {
          name: "zIndex",
          enabled: true,
          phase: "beforeWrite",
          fn({ state }) {
            state.styles.popper.zIndex = "910";
          },
        },
      ],
    }}
  />
))(() => ({
  [`& .MuiTooltip-popper`]: {
    zIndex: "100 !important",
  },
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#E33629",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    padding: "6px 12px",
    borderRadius: "4px",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#E33629",
  },
}));
