import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import {toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Row from '../components/Row';


export default function Home(ws) {

    const [blocks, setBlocks] = useState([]);

    useEffect(()=> {
        ws.socket.on("blocks", data => setBlocks(data));

        ws.socket.on("notification", data => {
            toast(`Hey! ${data.hash} changed!`);
        });
      }, [ws.socket, blocks])


    return (
        <div>
            <Header>
            </Header>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Bits</TableCell>
                            <TableCell align="right">Confirmations</TableCell>
                            <TableCell align="right">Hash</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Subscribe</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blocks.map((row) => (
                            <Row key={row.hash} row={row} ws={ws} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}