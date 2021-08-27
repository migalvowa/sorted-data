import React, { useEffect, useState } from "react";

import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import SortedSelect from "./components/SortedSelect";
import { useSortedData } from "./hooks/useSortedData";

import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [sort, setSort] = useState("");

  const sortedData = useSortedData(data, sort);

  useEffect(() => {
    axios
      .get(
        "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=lastUpdated&dumpRaw=false"
      )
      .then((result) => {
        setData(result.data.results);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <SortedSelect
          value={sort}
          onChange={setSort}
          defaultValue="Sorting"
          options={[
            { value: "default", name: "Default" },
            { value: "location", name: "Location" },
          ]}
        />
      </div>

      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData &&
              sortedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.country}
                  </TableCell>
                  <TableCell>{row.location}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
