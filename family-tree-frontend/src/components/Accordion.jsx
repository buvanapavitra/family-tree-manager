import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Accordion = ({ members, onEdit, onDelete }) => {
  return (
    <Box ml={4}>
      {members.map((member) => (
        <AccordionItem
          key={member.id}
          member={member}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
};

const AccordionItem = ({ member, onEdit, onDelete }) => {
  return (
    <MuiAccordion disableGutters elevation={1} sx={{ mb: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          sx={{
             mx: "auto",
            padding: 1,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
          }}
          
        >
          <Typography>
            👤 {member.name} ({member.age} yrs)
          </Typography>
          <Box onClick={(e) => e.stopPropagation()}>
            <IconButton
              onClick={() => onEdit(member)}
              size="small"
              color="primary"
              title="Edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => onDelete(member)}
              size="small"
              color="error"
              title="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </AccordionSummary>

      {member.children?.length > 0 && (
        <AccordionDetails>
          <Accordion
            members={member.children}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </AccordionDetails>
      )}
    </MuiAccordion>
  );
};

export default Accordion;
