// Photos.tsx
import { useGlobalContext } from "../contexts/hook";
import { Container, Grid, Typography } from "@mui/material";
import { StyledCard, StyledCardMedia } from "./Styles";
import { MoonLoader } from "react-spinners";
import { v4 as uuidv4 } from "uuid";

const override: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Photos = () => {
  const context = useGlobalContext();

  if (!context) {
    return null;
  }

  const { photos, loading } = context;

  if (loading) {
    return (
      <MoonLoader color="#36d7b7" loading={loading} cssOverride={override} />
    );
  }

  if (photos.length === 0) {
    return (
      <div style={{ margin: "50px 0", textAlign: "center" }}>
        <Typography variant="h2">No photos found</Typography>
      </div>
    );
  }

  const photoKeys = photos.map(() => uuidv4());

  return (
    <>
      <Container maxWidth="md" sx={{ padding: "20px 0" }}>
        <Grid container spacing={4}>
          {photos.map((photo, index) => (
            <Grid item key={photoKeys[index]} xs={12} sm={6} md={4}>
              <StyledCard>
                <StyledCardMedia
                  image={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                />
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Photos;
