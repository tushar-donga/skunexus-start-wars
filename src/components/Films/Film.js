import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchFilms } from "../../redux/action"
import { generateCustomTable } from "../../utils"
import Grid from "../Grid/Grid"

const Film = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const planetData = useSelector((state) => state)
  const [tableData, setTableData] = useState([])
  let location = useLocation()
  const filmData = location.state.data

  const getFilmsData = () => {
    console.log("no data")
  }

  const getResidentsData = () => {
    console.log("no data")
  }

  const showDetails = (rowData) => navigate("/details", { state: { data: rowData } })

  useEffect(() => {
    if (filmData) {
      dispatch(fetchFilms(filmData))
    }
  }, [])

  const getCustomData = (films) => {
    const filmData = generateCustomTable(
      films,
      () => getFilmsData(),
      () => getResidentsData(),
      (res) => showDetails(res)
    )
    setTableData(...filmData)
  }

  useEffect(() => {
    if (planetData.films.length) {
      getCustomData(planetData.films)
    }
  }, [planetData.films])

  return (
    <div>
      <div className="d-flex justify-content-between m-3 p-3">
        <h1 className="border-bottom border-dark">Films</h1>
        <button className="btn btn-lg btn-dark me-5" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
      {tableData && <Grid data={tableData} />}
    </div>
  )
}

export default Film
