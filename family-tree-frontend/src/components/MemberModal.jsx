import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';

const MemberModal = ({ isOpen, onClose, onSubmit, members, editData }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [parentId, setParentId] = useState('');

  // Reset or set form data based on mode and modal state
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setName(editData.name || '');
        setAge(editData.age || '');
        setParentId(editData.parent_id || '');
      } else {
        setName('');
        setAge('');
        setParentId('');
      }
    }
  }, [isOpen, editData]);

  const handleSubmit = () => {
    onSubmit({
      id: editData?.id,
      name,
      age,
      parent_id: parentId || null
    });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-70%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          {editData ? 'Update Member' : 'Add Member'}
        </Typography>

        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Age"
          type="number"
          inputProps={{ min: 0, max: 100 }}
          value={age}
          onChange={e => {
            const val = parseInt(e.target.value, 10);
            if (val <= 100) setAge(e.target.value);
          }}
          fullWidth
        />

        {!editData && (
          <FormControl fullWidth>
            <InputLabel id="parent-select-label">Parent</InputLabel>
            <Select
              labelId="parent-select-label"
              value={parentId}
              label="Parent"
              onChange={e => setParentId(e.target.value)}
            >
              <MenuItem value="">No Parent (New Root)</MenuItem>
              {flatten(members).map(m => (
                <MenuItem key={m.id} value={m.id}>
                  {m.name} ({m.age})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

function flatten(membersList, arr = []) {
  membersList.forEach(member => {
    arr.push(member);
    if (member.children && Array.isArray(member.children)) {
      flatten(member.children, arr);
    }
  });
  return arr;
}

export default MemberModal;
