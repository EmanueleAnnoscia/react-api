import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [actors, setActors] = useState([]);
  const [actresses, setActresses] = useState([]);
  const [filter, setFilter] = useState("Tutti");

 //useEffect con chiamate degli attori/trici 
  useEffect(() => {
    // chiamata axios attori
    axios.get("https://lanciweb.github.io/demo/api/actors/")
      .then((response) => {
        console.log("Attori:", response.data);
        setActors(response.data);
      });

    //chiamata axios attrici
    axios.get("https://lanciweb.github.io/demo/api/actresses/")
      .then((response) => {
        console.log("Attrici:", response.data);
        setActresses(response.data);
      });
  }, []);

  // lista filtrata in base alla selezione
  let filteredList = [];

  if (filter === "actors") {
    filteredList = actors;
  } else if (filter === "actresses") {
    filteredList = actresses;
  } else {
    filteredList = [...actors, ...actresses];
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Attori e Attrici</h1>

      {/*select per filtrare tra tutti, attori, attrici */}
      <div className="mb-4">
        <select
          className="form-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tutti</option>
          <option value="actors">Solo Attori</option>
          <option value="actresses">Solo Attrici</option>
        </select>
      </div>

      {/* card attori */}
      <div className="row">
        {filteredList.map((person, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow">
              <img
                src={person.image}
                className="card-img-top"
                alt={person.name}
                style={{ objectFit: "cover", height: "300px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <p className="card-text">
                  <strong>Anno di nascita:</strong> {person.birth}<br />
                  <strong>Nazionalità:</strong> {person.nationality}<br />
                  <strong>Riconoscimenti:</strong> {person.awards}
                </p>
                <p className="card-text"><em>{person.bio}</em></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
