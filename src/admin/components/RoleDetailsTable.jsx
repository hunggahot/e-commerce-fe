import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  findRoleById,
  toggleRolePermission,
} from '../../state/Admin/Role/Action';
import PermissionEnum from './PermissionEnum';
import { Checkbox, FormControlLabel, FormGroup, Paper } from '@mui/material';

const RoleDetailsTable = () => {
  const dispatch = useDispatch();
  const { roleId } = useParams(); // Corrected variable name
  const { roles } = useSelector((store) => store);
  const [permissions, setPermissions] = useState({});

  const handlePermissionToggle = (permission, isEnabled) => {
    dispatch(toggleRolePermission(roleId, permission, isEnabled));
  };

  useEffect(() => {
    dispatch(findRoleById(roleId));

    if (roles && roles.permissions) {
      const initialPermissions = {};
      roles.permissions.forEach((permission) => {
        initialPermissions[permission] = true;
      });
      setPermissions(initialPermissions);
    }
  }, [dispatch, roleId, roles]);

  return (
    <div className="p-5">
      <Paper elevation={3}>
        <h2>Role Details</h2>
        {Object.keys(permissions).map((permission) => (
          <FormGroup key={permission}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={permissions[permission]}
                  onChange={(e) =>
                    handlePermissionToggle(permission, e.target.checked)
                  }
                />
              }
              label={PermissionEnum[permission]}
            />
          </FormGroup>
        ))}
      </Paper>
    </div>
  );
};
export default RoleDetailsTable;
