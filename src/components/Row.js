import SimpleDateTime from 'react-simple-timestamp-to-date';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Checkbox } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { getTransactionsOfBlock } from '../network/client';


export default function Row(props) {
    const { row, ws } = props;
    const [open, setOpen] = useState(false);
    const [hash, setHash] = useState("");
    const [transactions, setTransactions] = useState([]);
    

    const fetchTransactions = async () => {
        const data = await getTransactionsOfBlock(hash);        
        setTransactions(data.list);
    }

    useEffect(() => {
        if (hash) {
            fetchTransactions();
        }

        return () => { };
    }, [hash])

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => {
                            setOpen(!open);
                            setHash(row.hash);
                        }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.bits}
                </TableCell>
                <TableCell align="right">{row.confirmations}</TableCell>
                <TableCell align="right">{row.hash}</TableCell>
                <TableCell align="right">{row.size}</TableCell>
                <TableCell align="right">
                    <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{row.timestamp}</SimpleDateTime>
                </TableCell>
                <TableCell align="right">
                    <Checkbox
                        checked={row.subscribe}
                        onChange={(e) => {
                            if (!e.target.checked) {
                                ws.socket.emit("unSubscribe", { hash: row.hash,bits : row.bits, socketId: ws.socket.id })
                            } else {
                                ws.socket.emit("subscribe", { hash: row.hash, socketId: ws.socket.id })
                            }

                        }}
                    ></Checkbox>

                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Transactions
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Block Hash</TableCell>
                                        <TableCell>Hash</TableCell>
                                        <TableCell align="right">Size</TableCell>
                                        <TableCell align="right">Addresses</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        transactions.map((tx) => (
                                            <TableRow key={tx.hash}>
                                                <TableCell component="th" scope="row">
                                                    {tx.block_hash}
                                                </TableCell>
                                                <TableCell>{tx.hash}</TableCell>
                                                <TableCell align="right">{tx.size}</TableCell>
                                                <TableCell align="right">
                                                    {
                                                        tx.outputs.map((e) => e.addresses).join(",\n")
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

