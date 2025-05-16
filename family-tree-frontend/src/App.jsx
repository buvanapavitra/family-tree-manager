import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Accordion from "./components/Accordion";
import MemberModal from "./components/MemberModal";
import DeleteModal from "./components/DeleteModal";
import {
  fetchMembers,
  addMember,
  updateMember,
  deleteMember,
} from "./redux/actions";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
} from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import backgroundImage from "./assets/treeimage.jpg";

function App() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteMemberData, setDeleteMemberData] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleEdit = (member) => {
    setEditData(member);
    setModalOpen(true);
  };

  const handleDelete = (member) => {
    setDeleteMemberData(member);
    setDeleteOpen(true);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        px: 34,
        textAlign: "center",
      }}
    >
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#5C4033", py: 1 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Empty Box to balance layout */}
          <Box width="80px" />

          {/* Centered title and icon */}
          <Box textAlign="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={0.5}
            >
              <FamilyRestroomIcon
                fontSize="large"
                sx={{ mr: 1, color: "#fff" }}
              />
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "1.8rem", sm: "2.4rem" },
                  letterSpacing: "0.5px",
                  color: "#FFFFFF",
                }}
                noWrap
              >
                Family Tree Manager
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: { xs: "0.85rem", sm: "1rem" },
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.85)",
                fontStyle: "italic",
              }}
            >
              Connect Generations, One Click at a Time.
            </Typography>
          </Box>

          {/* Right Home button */}
          <Box width="100px" display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => setAboutOpen(true)}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer */}
      <Toolbar />

      {/* Add Member Button */}
      <Box display="flex" justifyContent="center" mt={6} mb={3}>
        <Button
          sx={{
            px: 10,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: 3,
          }}
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}
        >
          Add Member
        </Button>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "20vh", // Full viewport height
          display: "flex",
          justifyContent: "center", // Horizontally center
          alignItems: "center", // Vertically center
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            mx: "auto",
            width: "100%",
            maxWidth: "900px",
             justifyContent: "center", // Horizontally center
          alignItems: "center", 
            gap: 2,
            backgroundColor: "rgba(255, 255, 255, 0.9)", // translucent white bg for readability
            borderRadius: 2,
            p: 2,
          }}
        >
          <Accordion
            members={members}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
      </Container>

      {/* Add/Edit Modal */}
      <MemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(data) => {
          editData ? dispatch(updateMember(data)) : dispatch(addMember(data));
          setModalOpen(false);
        }}
        members={members}
        editData={editData}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={(id) => dispatch(deleteMember(id))}
        member={deleteMemberData}
      />

      {/* About  */}
      <Dialog open={aboutOpen} onClose={() => setAboutOpen(false)}>
        <DialogTitle>About</DialogTitle>
        <DialogContent>
          <Typography>
            <strong>Family Tree Manager</strong> is a app developed using React,
            Redux, Node.js, and MySQL to manage and visualize family
            relationships. You can add, edit, and delete members in a nested
            accordion view. Background Image Credits: pngtree
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAboutOpen(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
