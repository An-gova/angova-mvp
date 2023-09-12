import "./index.css";
import "./home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomBar from "./components/BottomBar";
import NavbarComponent from "./components/Navbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { makeStyles } from "@mui/styles";
import { filterSessionsByLanguage } from "./services/sessionService";

import jsonDataFr from "./data/content_fr.json";
import jsonDataEs from "./data/content_es.json";
import jsonDataEn from "./data/content_en.json";
import jsonDataMa from "./data/content_fr.json";

import ListSession from "./components/ListSessions";
import Quizz from "./components/Quizz";
import { useTranslation } from "react-i18next";
import { processSessions } from "./services/sessionService";

function Home() {
  const { t, i18n } = useTranslation();
  const franceRoundedFlag = "./images/flag/rounded/france.png";
  const englishRoundedFlag = "./images/flag/rounded/uk.png";
  const algeriaRoundedFlag = "./images/flag/rounded/algeria.png";
  const moroccoRoundedFlag = "./images/flag/rounded/morocco.png";
  const tuniRoundedFlag = "./images/flag/rounded/tunisia.png";
  const turkeyRoundedFlag = "./images/flag/rounded/turkey.png";
  const earthFlag = "./images/flag/rounded/earth.png";
  const spainRoundedFlag = "./images/flag/rounded/spain.png";
  const ukraineRoundedFlag = "./images/flag/rounded/ukraine.png";

  const theme = createTheme({
    typography: {
      fontFamily: ["IgraSans", "Raleway", "Arial"].join(","),
    },
  });

  const useStyles = makeStyles({
    container: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 30,
      paddingLeft: 20,
      paddingRight: 20,
      gap: 30,
    },
    card: {
      position: "relative",
      transition: "background-color 0.3s",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      },
    },
    cardMedia: {
      height: "100%",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundSize: "120%",
        cursor: "pointer",
      },
    },
    slide2: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      padding: "8px",
      backgroundColor: "rgba(70, 145, 205, 0.8)",
      color: "#fff",
      transition: "transform 0.3s ease",
      transform: "translateY(100%)",
      "&.active": {
        transform: "translateY(0)",
      },
      cursor: "pointer",
    },
    slide2Title: {
      fontWeight: 600,
      color: "#F49E4C",
      textAlign: "center",
    },
    flagNav: {
      width: "50%",
      cursor: "pointer",
      transition: "filter 0.3s, transform 0.3s",
      "&:hover": {
        filter: "brightness(80%)",
        transform: "scale(1.1)",
      },
    },
    languageText: {
      marginTop: 10,
      color: "#888",
      fontSize: 12,
      fontWeight: "bold",
      opacity: 0,
      transition: "opacity 0.3s",
    },
    languageTextVisible: {
      opacity: 1,
    },
  });
  const [show, setShow] = useState(false);
  const [value, setValue] = React.useState("code");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "profil") {
      navigate("/profil");
    }
  };
  const createLanguageSessionData = (language, jsonData) => {
    return jsonData.map((session) => {
      return {
        id: session.id,
        language: language,
      };
    });
  };

  const sessionFR = createLanguageSessionData("fr", jsonDataFr);
  const sessionES = createLanguageSessionData("es", jsonDataEs);
  // const sessionEN = createLanguageSessionData("en", jsonDataEn);
  const sessionMA = createLanguageSessionData("ma", jsonDataFr);

  const batchSize = 40;
  const sessions = [];
  const selectedLanguage = localStorage.getItem("language");

  switch (selectedLanguage) {
    case "fr":
      sessions.push(...processSessions(sessionFR, batchSize, t));
      break;
    case "es":
      sessions.push(...processSessions(sessionES, batchSize, t));
      break;
    case "en":
      // sessions.push(...processSessions(sessionEN, batchSize, t));
      break;
    case "ma":
      sessions.push(...processSessions(sessionMA, batchSize, t));

      break;
    default:
      // Default case if the language doesn't match any of the above

      break;
  }

  useEffect(() => {
    // we use this effect to see the language dialog
    // only if the user has not choose a language
    const hasLanguagePicked = localStorage.getItem("hasChoosenLanguage");

    if (hasLanguagePicked === null) {
      localStorage.setItem("hasChoosenLanguage", false);
    }
    if (hasLanguagePicked === "true") {
      setShow(false);
    } else {
      setLanguageImage("earth");
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    const hasLanguagePicked = localStorage.getItem("hasChoosenLanguage");
    if (hasLanguagePicked === "true") {
      setShow(false);
    }
  };

  const setLanguage = (language) => {
    localStorage.setItem("language", language);
    localStorage.setItem("hasChoosenLanguage", true);
    i18n.changeLanguage(language);
    handleClose();
  };
  const [hoveredCard, setHoveredCard] = useState(null);

  const [component, setComponent] = useState("sessionCode");

  const classes = useStyles();
  const handleHover = (id) => {
    setHoveredCard(id);
  };
  const Flag = ({ src, language }) => {
    const [isLanguageVisible, setLanguageVisible] = useState(false);

    const handleClick = () => {
      setLanguage(language);
    };

    const handleMouseEnter = () => {
      setLanguageVisible(true);
    };

    const handleMouseLeave = () => {
      setLanguageVisible(false);
    };

    return (
      <Grid
        item
        xs={4}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <img
          className={classes.flagNav}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          src={src}
          alt="flag"
        />
        <div
          className={`${classes.languageText} ${
            isLanguageVisible ? classes.languageTextVisible : ""
          }`}
        >
          {t(language)}
        </div>
      </Grid>
    );
  };
  const setLanguageImage = (language) => {
    let src = null;
    switch (language) {
      case "earth":
        src = earthFlag;
        break;
      case "fr":
        src = franceRoundedFlag;
        break;
      case "en":
        src = englishRoundedFlag;
        break;
      case "es":
        src = spainRoundedFlag;
        break;
      case "ar":
        src = moroccoRoundedFlag;
        break;
      case "dz":
        src = algeriaRoundedFlag;
        break;
      case "ma":
        src = moroccoRoundedFlag;
        break;
      case "tn":
        src = tuniRoundedFlag;
        break;
      case "tr":
        src = turkeyRoundedFlag;
        break;
      case "ukr":
        src = ukraineRoundedFlag;
        break;
      default:
        src = null;
        break;
    }

    return (
      <img
        className="languageNavImg"
        onClick={() => {
          setShow(true);
        }}
        src={src}
        alt={language}
      />
    );
  };
  let displayedSessions = sessions; // Par défaut, toutes les sessions sont affichées

  //if (selectedLanguage === "ma") {
  // Si la langue sélectionnée est "ma", limitez à 3 sessions
  displayedSessions = sessions.slice(0, 3);
  // }else{

  // }
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavbarComponent page={value} setLanguageImage={setLanguageImage} />
        <Grid id="sessionContainer" container direction="row">
          <Grid
            item
            lg={3}
            sx={{
              flexDirection: "column",
              alignItems: "end",
              display: { xs: "none", lg: "flex" },
            }}
          >
            <button
              onClick={() => {
                setComponent("sessionCode");
              }}
              className="btn-section"
            >
              <img
                src="./images/code_route.png"
                alt=""
                style={{ width: 40, marginRight: 15 }}
              />
              <span className="btn-section-title">{t("codeRoute")}</span>
            </button>

            <button
              onClick={() => {
                setComponent("quizz");
              }}
              className="btn-section"
            >
              <img
                src="./images/quizz.png"
                alt=""
                style={{ width: 40, marginRight: 15 }}
              />
              <span className="btn-section-title">Quizz</span>
            </button>
          </Grid>

          {component === "sessionCode" && (
            <ListSession
              classes={classes}
              sessions={displayedSessions}
              navigate={navigate}
              handleHover={handleHover}
              hoveredCard={hoveredCard}
            />
          )}
          {component === "quizz" && <Quizz />}
        </Grid>
        <Dialog fullWidth maxWidth="sm" open={show} onClose={handleClose}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DialogTitle>
              <Typography style={{ fontWeight: 700 }}>
                {t("choisir-la-langue-du-code-de-la-route")}
              </Typography>
              <IconButton
                aria-label="close"
                style={{
                  position: "absolute",
                  right: theme.spacing(1),
                  top: theme.spacing(1),
                  color: theme.palette.grey[500],
                }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                direction="row"
                style={{ alignItems: "center", marginBottom: 40 }}
              >
                <Flag src="./images/flag/rounded/france.png" language="fr" />
                <Flag src="./images/flag/rounded/spain.png" language="es" />
                {/* <Flag src="./images/flag/rounded/uk.png" language="en" /> */}
                {/* <Flag src="./images/flag/rounded/algeria.png" language="dz" /> */}
                <Flag src="./images/flag/rounded/morocco.png" language="ma" />
                {/* <Flag src="./images/flag/rounded/tunisia.png" language="tn" /> */}
                {/* <Flag src="./images/flag/rounded/turkey.png" language="tr" /> */}
              </Grid>
            </DialogContent>
          </div>
        </Dialog>
        <BottomBar handleChange={handleChange} value={value} />
      </ThemeProvider>
    </>
  );
}
export default Home;
