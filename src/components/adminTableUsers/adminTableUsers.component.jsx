// import "./adminTableProducts.component.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../utils/functions";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

Modal.setAppElement("#root");

const AdminTableUsersComponent = () => {
  const [usersData, setUsersData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let counter = 1;
  const tableStyle = {
    textTransform: "uppercase",
    color: "#052CA3",
    fontWeight: "700",
    textDecoration: "underline",
  };

  useEffect(() => {
    axios
      .get("/users/allusers")
      .then((data) => {
        console.log("users: ", data);
        setUsersData(data.data);
      })
      .catch((err) => {
        console.log("error from all users data: ", err);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteUser = (id) => {
    const token = localStorage.getItem("token");
    axios
      .post(`/users/deleteuser/${id}`, { token: token })
      .then((res) => {
        if (res.status === 200) {
          notify("user deleted successfuly");
          setCurrentUser(null);
          axios
            .get("/users/allusers")
            .then((data) => {
              console.log("users: ", data);
              setUsersData(data.data);
            })
            .catch((err) => {
              console.log("error from all users data: ", err);
            });
        }
      })
      .catch((err) => {
        console.log("error deleting the user: ", err);
      });
  };

  function createData(firstname, lastname, email, phone, isAdmin, id) {
    return { firstname, lastname, email, phone, isAdmin, id };
  }

  const rows = [
    ...usersData.map((user) => {
      return createData(
        user.firstname,
        user.lastname,
        user.email,
        user.phone,
        user.isAdmin,
        user._id
      );
    }),
  ];

  return (
    <>
      <div className="table_container">
        <h1 className="table_title" style={{ margin: "20px" }}>
          Users{" "}
        </h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={tableStyle}>#</TableCell>
                <TableCell align="left" style={tableStyle}>
                  First Name
                </TableCell>
                <TableCell align="left" style={tableStyle}>
                  Last Name
                </TableCell>
                <TableCell align="left" style={tableStyle}>
                  Email
                </TableCell>
                <TableCell align="left" style={tableStyle}>
                  Phone Number
                </TableCell>
                <TableCell align="left" style={tableStyle}>
                  Admin?
                </TableCell>
                <TableCell align="left" style={tableStyle}>
                  ID
                </TableCell>
                <TableCell align="left" style={tableStyle}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.firstname + row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {counter++}
                  </TableCell>
                  <TableCell align="left">{row.firstname}</TableCell>
                  <TableCell align="left">{row.lastname}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.phone}</TableCell>
                  <TableCell align="left">
                    {row.isAdmin ? "true" : "false"}
                  </TableCell>
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => setCurrentUser(row)}
                      color="warning"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Modal
            isOpen={Boolean(currentUser)}
            onRequestClose={() => setCurrentUser(null)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
          >
            <div className="modal_div">
              <div className="input">
                <h3>
                  Are you sure you want to <br />
                  delete the user: {currentUser?.firstname}
                </h3>
              </div>
              <div className="buttons">
                <div className="button">
                  <Button
                    onClick={() => deleteUser(currentUser.id)}
                    variant="contained"
                    color="success"
                    size="small"
                  >
                    Delete
                  </Button>
                </div>
                <div className="button">
                  <Button
                    onClick={() => setCurrentUser(null)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
          <div className="table_footer">
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </div>
        </TableContainer>
      </div>
    </>
  );
};

export default AdminTableUsersComponent;
