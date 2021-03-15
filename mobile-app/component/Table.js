import React from 'react';
import { 
  Table,
  TableHead,
  TableRow, 
  TableCell,
  TableBody,
} from '@material-ui/core';

function CustomTable({

}) {
  return (
    <div className="w-100">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Image Name</TableCell>
            <TableCell className="text-center">Image Type</TableCell>
            <TableCell className="text-center">Prediction</TableCell>
            <TableCell className="text-center">Class Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>test</TableCell>
            <TableCell className="text-center">image/png</TableCell>
            <TableCell className="text-center">95%</TableCell>
            <TableCell className="text-center">White Leaf Disease</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;