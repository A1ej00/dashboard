import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useEffect, useState } from 'react';
import item from '../interface/item';


interface MyProp {
  itemsIn: item[];
}


export default function BasicTable(props: MyProp) {
  let [rows, setRows] = useState<item[]>([])

  useEffect( ()=> {
    setRows(props.itemsIn)
  }, [props])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="row">Hora de inicio</TableCell>
            <TableCell component="th" scope="row">Hora de fin</TableCell>
            <TableCell component="th" scope="row">Precipitación</TableCell>
            <TableCell component="th" scope="row">Humedad</TableCell>
            <TableCell component="th" scope="row">Nubosidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.dateStart}</TableCell>
              <TableCell component="th" scope="row">{row.dateEnd}</TableCell>
              <TableCell component="th" scope="row">{row.precipitation}</TableCell>
              <TableCell component="th" scope="row">{row.humidity}</TableCell>
              <TableCell component="th" scope="row">{row.clouds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}