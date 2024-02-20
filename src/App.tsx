// App.tsx
import { Grid } from "@mui/material";
import Header from "./components/Header";
import Photos from "./components/Photos";

function App() {
  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Header />
        <Photos />
      </Grid>
    </>
  );
}

export default App;
