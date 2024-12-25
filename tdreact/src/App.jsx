import { useState, useEffect } from "react";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function MainContent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateString = currentDate.toLocaleDateString("fr-FR", options);
  const timeString = currentDate.toLocaleTimeString("fr-FR");

  return (
    <p>
      Bonjour, on est le {dateString} et il est {timeString}.
    </p>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  const authorName = "Ayman EL KARROUSSI";

  return (
    <p>
      © {currentYear} - {authorName}, Tous droits réservés.
    </p>
  );
}

function Header() {
  return (
    <header>
      <img
        src="https://emsi.ma/wp-content/uploads/2020/07/logo.png"
        alt="Logo Emsi"
        style={{ width: "100%", maxWidth: "300px", height: "auto" }}
      />
      <h1>Introduction à React</h1>
      <h2>A la découverte des premières notions de React</h2>
    </header>
  );
}

function Menu({ onMenuChange }) {
  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  const handleClick = (item) => {
    setActiveItem(item);
    onMenuChange(item);
  };

  return (
    <nav style={{ position: "absolute", top: 0, left: 0, padding: "10px" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {menuItems.map((item) => (
          <li key={item} style={{ margin: "10px 0" }}>
            <button
              style={{
                backgroundColor: activeItem === item ? "#0056b3" : "#007BFF",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
              }}
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const Notes = ({ data }) => (
  <TableContainer
    component={Paper}
    style={{ margin: "20px auto", width: "80%" }}
  >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Nom de l'Étudiant</TableCell>
          <TableCell>Matière</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Note</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.unique_id}>
            <TableCell>{item.unique_id}</TableCell>
            <TableCell>{`${item.student.firstname} ${item.student.lastname}`}</TableCell>
            <TableCell>{item.course}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.grade}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

// Composants de base pour les autres sections
const Etudiants = ({ data }) => {
  const students = Array.from(
    new Map(data.map((item) => [item.student.id, item.student])).values()
  );

  return (
    <TableContainer
      component={Paper}
      style={{ margin: "20px auto", width: "80%" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Nom</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.firstname}</TableCell>
              <TableCell>{student.lastname}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Matieres = ({ data }) => {
  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center" }}>Aucune matière disponible</p>;
  }

  const courses = Array.from(new Set(data.map((item) => item.course)));

  return (
    <TableContainer
      component={Paper}
      style={{ margin: "20px auto", width: "80%" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Matières</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              <TableCell>{course}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const APropos = () => (
  <div style={{ margin: "20px auto", width: "80%" }}>
    <h2>À Propos</h2>
    <p>
      Cette application React a été développée pour illustrer les concepts
      fondamentaux de React.
    </p>
    <p>Auteur : Ayman EL KARROUSSI. Merci de votre visite !</p>
  </div>
);

function App() {
  const [data, setData] = useState([]);
  const [activeMenu, setActiveMenu] = useState("Notes");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        return response.json();
      })
      .then((jsonData) => setData(jsonData))
      .catch((error) =>
        console.error("Erreur lors du chargement des données:", error)
      );
  }, []);

  const renderContent = () => {
    switch (activeMenu) {
      case "Notes":
        return <Notes data={data} />;
      case "Etudiants":
        return <Etudiants data={data} />;
      case "Matières":
        return <Matieres data={data} />;
      case "A propos":
        return <APropos />;
      default:
        return null;
    }
  };

  return (
    <>
      <Menu onMenuChange={setActiveMenu} />
      <Header />
      <MainContent />

      <div>{renderContent()}</div>
      <Footer />
    </>
  );
}

export default App;
