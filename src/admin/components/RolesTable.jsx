import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRole, editRole, getRoles } from '../../state/Admin/Role/Action';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RolesTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roles } = useSelector((store) => store);
  const [editRoleId, setEditRoleId] = useState(null);
  const [deleteRoleId, setDeleteRoleId] = useState(null);
  const [editedRoleName, setEditedRoleName] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleRoleEdit = (roleId, roleName) => {
    setEditRoleId(roleId);
    setEditedRoleName(roleName);
    setOpenEditDialog(true);
  };

  const handleRoleDelete = (roleId) => {
    setDeleteRoleId(roleId);
    setOpenDeleteDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setEditRoleId(null);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setDeleteRoleId(null);
  };

  const handleEditRoleNameChange = (event) => {
    setEditedRoleName(event.target.value);
  };

  const handleSaveEditedRole = () => {
    dispatch(editRole(editRoleId, { name: editedRoleName }));
    setOpenEditDialog(false);
  };

  const handleConfirmDeleteRole = () => {
    dispatch(deleteRole(deleteRoleId));
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  return (
    <div className="p-5">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Roles" />
      </Card>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Role Name</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.roles.map((role) => (
              <TableRow
                key={role.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{role.name}</TableCell>
                <TableCell align="left">
                  <Button
                    onClick={() => handleRoleEdit(role.id, role.name)}
                    variant="outlined"
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    onClick={() => handleRoleDelete(role.id)}
                    variant="outlined"
                  >
                    Delete
                  </Button>{' '}
                  <Button
                    onClick={() => navigate(`/admin/role-details/${role.id}`)}
                    variant="outlined"
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Role Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            variant="outlined"
            value={editedRoleName}
            onChange={handleEditRoleNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEditedRole} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Role Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this role?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDeleteRole} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RolesTable;
