import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginRegister from "../LoginRegister";

const GroupLoggedOut = () => {
  return (
    <>
      <Header />
      <Stack spacing={2}>
        <Typography variant="h4">Neue Gruppe erstellen</Typography>
        <Typography>
          Um ihre eigene Gruppe zu erstellen müssen Sie sich entweder mit ihrem
          Account einloggen oder sich kostenlos einen Account errstellen!
        </Typography>
        <LoginRegister />
        <Button onClick={() => navigate(-1)}>Zurück</Button>
      </Stack>
      <Footer />
    </>
  );
};

export default GroupLoggedOut;
