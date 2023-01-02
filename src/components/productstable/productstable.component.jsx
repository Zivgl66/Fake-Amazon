import "./productstable.component.css";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import ProductItemComponent from "../productItem/productItem.component";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PaginationComponent from "../pagination/pagination.component";

const ProductsTableComponent = () => {
  let { search } = useParams();
  const products = useSelector((state) => state.auth.products);
  const [slicedProductsArr, setSlicedProductsArr] = useState([]);
  const [startProductsArr, setStartProductsArr] = useState([]);
  const theme = useTheme();
  const [catagoryName, setCatagoryName] = useState([]);
  const catagoryNames = [
    "Home & Kitchen",
    "Cell Phones & Accessories",
    "Computers & Accessories",
    "Lighting & Ceiling Fans",
    "Tools & Home Improvement",
    "Televisions & Video Products",
  ];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const divStyle = {
    background: " #2de1fd53",
    background:
      "linear-gradient(0deg, rgba(123,202,232,0) 15%, #4d648368 51%, rgba(133,185,221,0) 85%)",
    borderRadius: "25px",
    padding: "14px",
    marginTop: "10px",
  };
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate_Prev = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth", // for smoothly scrolling
      });
    }
  };
  const paginate_Next = () => {
    if (currentPage !== Math.ceil(posts.length / postPerPage)) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth", // for smoothly scrolling
      });
    }
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };
  function getStyles(name, catagoryName, theme) {
    return {
      fontWeight:
        catagoryName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  useEffect(() => {
    if (catagoryName.length === 0) {
      setPosts(startProductsArr);
    } else {
      let tempArr = [];
      catagoryName.forEach((c) => {
        startProductsArr.forEach((p) => {
          if (p.catagory === c) {
            tempArr.push(p);
          }
        });
      });
      console.log("temp is: ", tempArr);
      setPosts(tempArr);
    }
  }, [catagoryName]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCatagoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    // setCatagorySelected(event.target.value);
  };

  useEffect(() => {
    let tempArr = [];
    setCurrentPage(1);
    let catagoryFound = catagoryNames.filter((c) => {
      return c === search;
    });
    if (catagoryFound.length > 0) {
      console.log("searcg c: ", catagoryFound);
      tempArr = products.filter((product) => {
        return product.catagory === search;
      });
      setSlicedProductsArr(tempArr);
      setStartProductsArr(tempArr);
      setPosts(tempArr);
    } else if (search === "searchvalueisempty") {
      console.log("search is empty!");
      setSlicedProductsArr(products);
      setStartProductsArr(products);
      setPosts(products);
    } else {
      console.log("searched: ", search);
      tempArr = products.filter((product) => {
        return product.name.toLowerCase().includes(`${search}`);
      });
      console.log("temp arr: ", tempArr);
      setSlicedProductsArr(tempArr);
      setStartProductsArr(tempArr);
      setPosts(tempArr);
    }
  }, [search]);

  return (
    <div className="container_products_table">
      <div className="product_table_title">
        <div className="product_table_name">
          <h2>
            Results for: "{search === "searchvalueisempty" ? "" : search}"
          </h2>
        </div>
        <div className="product_table_filter">
          <FormControl
            sx={{ m: 1, width: { xs: 150, sm: 200, md: 300 }, mt: 3 }}
          >
            <Select
              multiple
              displayEmpty
              value={catagoryName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Catagory</em>;
                }
                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>filter</em>
              </MenuItem>
              {catagoryNames.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, catagoryName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
        </div>
      </div>
      {currentPosts.length > 0 ? (
        <Container fluid style={divStyle}>
          <Row>
            {currentPosts.map((product, index) => (
              <Col
                key={index + product}
                xs={12}
                sm={6}
                md={4}
                lg={4}
                className="align-items-center justify-content-center d-flex"
              >
                <ProductItemComponent
                  id={product._id}
                  title={product.name}
                  price={product.price}
                  rating={product.rating ? product.rating : 5}
                  image={product.imageURL}
                  key={"productKey" + index}
                />
              </Col>
            ))}
          </Row>
          <PaginationComponent
            postsPerPage={postPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            paginate_Prev={paginate_Prev}
            paginate_Next={paginate_Next}
          />
        </Container>
      ) : (
        <div className="no_results">
          <p>"no results were found..."</p>
        </div>
      )}
    </div>
  );
};

export default ProductsTableComponent;
