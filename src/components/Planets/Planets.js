import "./Planets.css"
import Grid from "../Grid/Grid"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData } from "../../redux/action"
import { useNavigate } from "react-router-dom"
import { generateCustomTable } from "../../utils"

function Planets() {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const planetData = useSelector((state) => state)
  const [tableData, setTableData] = useState([])

  const showDetails = (rowData) => navigate("/details", { state: { data: rowData } })

  useEffect(() => {
    dispatch(fetchData("https://swapi.dev/api/planets/"))
  }, [dispatch])

  const getFilmsData = (rowData) => navigate("films", { state: { data: rowData } })

  const getResidentsData = (rowData) => navigate("residents", { state: { data: rowData } })

  const getCustomData = (residents) => {
    const filmData = generateCustomTable(
      residents,
      (res) => getFilmsData(res),
      (res) => getResidentsData(res),
      (res) => showDetails(res)
    )
    setTableData(...filmData)
  }

  useEffect(() => {
    if (planetData.planet.length) {
      getCustomData(planetData.planet)
    }
  }, [planetData.planet])

  return <div className="App">{tableData && <Grid data={tableData} />}</div>
}

export default Planets
