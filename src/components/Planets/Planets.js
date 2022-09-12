import "./Planets.css";
import Grid from "../Grid/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchFilms, fetchResident } from "../../redux/action";
import { useNavigate } from "react-router-dom";

function Planets() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const planetData = useSelector((state) => state);
  const [tableData, setTableData] = useState([]);

  const showDetails = (rowData) => navigate("/details", { state: { data: rowData } });

  useEffect(() => {
    dispatch(fetchData("https://swapi.dev/api/planets/"));
  }, [dispatch]);

  const getFilmsData = (films) => {
    if (films) {
      dispatch(fetchFilms(films[0]));
    }
  };

  const getResidentsData = (resident) => {
    if (resident) dispatch(fetchResident(resident[0]));
  };

  const generateCustomTable = (data) => {
    if (data.length) {
      let columns = [];
      for (const [key, value] of Object.entries(data[0])) {
        if (key !== "created" && key !== "edited" && key !== "url") {
          columns.push({
            header: key,
            accessor: key,
            dataType: typeof value,
          });
        }
      }
      const tempData = {
        header: columns,
        rowData: data,
        actions: [
          {
            label: "Go to Films",
            action: (row) => {
              if (row.films) {
                getFilmsData(row.films);
              }
            },
          },
          {
            label: "Go to Residents",
            action: (row) => {
              if (row.residents) {
                getResidentsData(row.residents);
              }
            },
          },
          {
            label: "Show Details",
            action: (row) => showDetails(row),
          },
        ],
      };

      const tableState = [];
      tableState?.push(tempData);
      setTableData(...tableState);
    }
  };

  useEffect(() => {
    if (planetData.planet.length) {
      generateCustomTable(planetData.planet);
    }
  }, [planetData.planet]);

  useEffect(() => {
    if (planetData.films.length) {
      generateCustomTable(planetData.films);
    }
  }, [planetData.films]);

  useEffect(() => {
    if (planetData.residents.length) {
      generateCustomTable(planetData.residents);
    }
  }, [planetData.residents]);

  return <div className="App">{tableData && <Grid data={tableData} />}</div>;
}

export default Planets;
