// Styles.tsx
import { Button, Typography, Card, CardMedia } from "@mui/material";
import { styled } from "@mui/system";

export const StyledHeader = styled("header")(() => ({
  margin: "40px 0 20px",
}));

export const StyledTypography = styled(Typography)(() => ({
  fontFamily: "Lobster Two, sans-serif",
  fontWeight: "700",
  fontStyle: "italic",
}));

export const StyledButton = styled(Button)(() => ({
  backgroundColor: "#006D5B",
  margin: "10px 5px",
  "&:hover": {
    backgroundColor: "black",
  },
}));

export const StyledCard = styled(Card)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const StyledCardMedia = styled(CardMedia)(() => ({
  paddingTop: "56.25%", //aspect ratio=16:9
  cursor: "pointer",
}));
