import "./adminTableProducts.component.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../utils/functions";
import { authActions } from "../../store/auth";
import Modal from "react-modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

Modal.setAppElement("#root");

const AdminTableProductsComponent = () => {
  const products = useSelector((state) => state.auth.products);
  const [newStock, setNewStock] = useState(undefined);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  let counter = 1;

  const tableStyle = {
    textTransform: "uppercase",
    color: "#052CA3",
    fontWeight: "700",
    textDecoration: "underline",
  };

  useEffect(() => {
    axios
      .get("/products")
      .then((data) => {
        dispatch(authActions.updateProducts(data.data));
      })
      .catch((err) => {
        console.log("error from fetching products: ", err);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const deleteProduct = (id) => {
    axios
      .get(`/products/deleteproduct/${id}`)
      .then((res) => {
        if (res.status === 200) notify("product deleted successfuly");
        axios
          .get("/products")
          .then((data) => {
            dispatch(authActions.updateProducts(data.data));
          })
          .catch((err) => {
            console.log("error from fetching products: ", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateStock = (newStock, id) => {
    console.log(newStock, id);
    axios
      .post("/products/updateproductstock", { productId: id, stock: newStock })
      .then((res) => {
        if (res.status === 200) {
          notify("Stock was updated");
          axios
            .get("/products")
            .then((data) => {
              dispatch(authActions.updateProducts(data.data));
            })
            .catch((err) => {
              console.log("error from fetching products: ", err);
            });
          setCurrentProduct(null);
        } else notify("something went wrong");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function createData(name, price, stock, catagory, sellerId, id) {
    return { name, price, stock, sellerId, catagory, id };
  }

  const rows = [
    ...products.map((product) => {
      return createData(
        product.name,
        product.price,
        product.stock,
        product.catagory,
        product.sellerId,
        product._id
      );
    }),
  ];

  return (
    <>
      <div className="table_container">
        <h1 className="table_title" style={{ margin: "20px" }}>
          Products{" "}
        </h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={tableStyle}>#</TableCell>
                <TableCell style={tableStyle}>Product</TableCell>
                <TableCell align="right" style={tableStyle}>
                  Price
                </TableCell>
                <TableCell align="right" style={tableStyle}>
                  Catagory
                </TableCell>
                <TableCell align="right" style={tableStyle}>
                  Stock
                </TableCell>
                <TableCell align="right" style={tableStyle}>
                  Seller id
                </TableCell>
                <TableCell align="right" style={tableStyle}>
                  delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {counter++}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.catagory}</TableCell>
                    <TableCell align="right">
                      <strong>{row.stock}</strong>
                      <Button
                        color="secondary"
                        onClick={() => setCurrentProduct(row)}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell align="right">{row.sellerId}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => {
                          deleteProduct(row.id);
                        }}
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
            isOpen={Boolean(currentProduct)}
            onRequestClose={() => setCurrentProduct(null)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={500}
          >
            <div className="modal_div">
              <div className="input">
                <h3>{currentProduct?.name}</h3>
                <h4>Update the stock:</h4>
                <TextField
                  label="Stock"
                  id="standard-size-small"
                  defaultValue={currentProduct?.stock}
                  size="small"
                  variant="standard"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                />
              </div>
              <div className="buttons">
                <div className="button">
                  <Button
                    onClick={() => updateStock(newStock, currentProduct.id)}
                    variant="contained"
                    color="success"
                    size="small"
                  >
                    Update
                  </Button>
                </div>
                <div className="button">
                  <Button
                    onClick={() => setCurrentProduct(null)}
                    variant="contained"
                    color="error"
                    size="small"
                  >
                    Close
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

export default AdminTableProductsComponent;
