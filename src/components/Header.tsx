// Header.tsx
import { ChangeEvent } from "react";
import { useGlobalContext } from "../contexts/hook";
import { StyledHeader, StyledTypography, StyledButton } from "./Styles";
import { TextField, Grid } from "@mui/material";

const Header = () => {
  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const { setSearchTerm } = context;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (keyword: string) => {
    console.log(keyword);
    setSearchTerm(keyword);
  };

  return (
    <>
      <StyledHeader>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <StyledTypography variant="h2" gutterBottom>
            SnapShot
          </StyledTypography>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{ width: "70vw", marginBottom: "20px" }}
            onChange={handleChange}
          />
          <Grid container justifyContent="center" alignItems="center">
            <StyledButton
              variant="contained"
              onClick={() => handleClick("mountain")}
            >
              Mountains
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => handleClick("beach")}
            >
              Beaches
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => handleClick("bird")}
            >
              Birds
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={() => handleClick("food")}
            >
              Food
            </StyledButton>
          </Grid>
        </Grid>
      </StyledHeader>
    </>
  );
};

export default Header;
