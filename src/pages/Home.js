import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
//material-i icons
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Pageview from "@material-ui/icons/Pageview";
//import Redux
import { getCountries, postCountry } from "../_actions/country";
import { getProvince, postProvince } from "../_actions/province";
import { getCities, postCity } from "../_actions/city";
//import Component
import { DataDetails } from "../components/data-details";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  AppBar: {
    backgroundColor: "#a9bd7d",
    boxShadow: "none"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },

  yourCountry: {
    marginBottom: "20px",
    backgroundColor: "#a9bd7d",
    width: "100%",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff"
  },
  countries: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  country: {
    width: "400px",
    height: "50px",
    backgroundColor: "#fff",
    border: "1px solid #a9bd7d",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    cursor: "pointer"
  },
  province: {
    margin: "auto",
    width: "100%",
    height: "40px",
    backgroundColor: "#fff",
    border: "1px solid #a9bd7d",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    cursor: "pointer",
    fontSize: 20
  },
  provinceNone: {
    margin: "auto",
    width: "90%",
    height: "40px",
    border: "2px dashed #979c99",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    cursor: "pointer",
    color: "#fff",
    fontSize: 15
  },
  cities: {
    margin: "auto",
    width: "80%",
    height: "40px",
    backgroundColor: "#a9bd7d",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    cursor: "pointer",
    color: "#fff",
    fontSize: 20
  },
  addCities: {
    margin: "auto",
    width: "80%",
    height: "40px",
    border: "2px dashed #979c99",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    cursor: "pointer",
    color: "#fff",
    fontSize: 15
  },
  //modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  addCountry: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  addCountryInput: {
    marginBottom: 10
  },
  //Input Edit
  inputEdit: {
    border: "none",
    borderBottom: "1px solid #979c99",
    marginBottom: 20,
    outline: "none",
    padding: 10
  },
  //Button
  button: {
    border: "none",
    backgroundColor: "#a9bd7d",
    width: 70,
    height: 40,
    color: "#fff",
    border: "1px solid #979c99"
  }
}));

export default function Home() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const countries = useSelector(state => state.countries.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const doLogOut = () => {
    window.location = "/";
    localStorage.removeItem("token");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/Profile" style={{ textDecoration: "none" }}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={() => doLogOut()}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <div>
      <div className={classes.grow}>
        <AppBar position="static" className={classes.AppBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Cakra Tech
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
      <div className={classes.yourCountry}>
        <h1>Your Country</h1>
      </div>
      <div className={classes.countries}>
        {countries.map((item, index) => (
          <AllCountry
            key={index}
            name={item.country_name}
            id={item.id}
            code={item.country_code}
          />
        ))}

        <AddCountry />
      </div>
    </div>
  );
}

export const AllCountry = props => {
  const classes = useStyles();
  const [click, setClick] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  //Redux
  const dispatch = useDispatch();
  const province = useSelector(state => state.province.province);
  // console.log(province);
  useEffect(() => {
    dispatch(getProvince());
  }, []);

  const setclick = () => {
    setClick(!click);
  };

  return (
    <div>
      {click ? (
        <div
          className={classes.country}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <div style={{ opacity: visible ? 1 : 0 }}>
            <DataDetails name={props.name} code={props.code} type={"Country"} />
          </div>
          <div onClick={setclick} style={{ flex: 1, textAlign: "center" }}>
            {props.name}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "relative",
              width: "60px",
              opacity: visible ? 1 : 0
            }}
          >
            <div>
              <EditCountry />
            </div>
            <div>
              <DeleteCountry />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className={classes.country}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            <div style={{ opacity: visible ? 1 : 0 }}>
              <DataDetails
                name={props.name}
                code={props.code}
                type={"Country"}
              />
            </div>
            <div onClick={setclick} style={{ flex: 1, textAlign: "center" }}>
              {props.name}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "relative",
                width: "60px",
                opacity: visible ? 1 : 0
              }}
            >
              <div>
                <EditCountry />
              </div>
              <div>
                <DeleteCountry />
              </div>
            </div>
          </div>
          {province.find(function(e) {
            return e.country_id == props.id;
          }) ? (
            <div
              style={{
                border: "1px solid #a9bd7d",
                backgroundColor: "#a9bd7d",
                paddingLeft: "3px",
                paddingRight: "5px",
                marginBottom: 10,
                paddingTop: 5
              }}
            >
              {province.map((item, index) => (
                <div>
                  {props.id == item.country_id && (
                    <div>
                      <AllProvince
                        name={item.province_name}
                        code={item.province_code}
                        provinceId={item.id}
                        countryId={item.country_id}
                      />
                      {index == province.length - 1 && (
                        <div>
                          <AllProvince
                            name={"Add Province"}
                            countryId={item.country_id}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <AddProvince
                name={"Add Province"}
                countryId={props.id}
                color={"#000"}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const EditCountry = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Edit onClick={() => modalOpen()} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div
            style={{ backgroundColor: "#fff", height: 300, width: 300 }}
          ></div>
        </Fade>
      </Modal>
    </div>
  );
};

export const DeleteCountry = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const deleteCountry = () => {
    alert("tes");
  };

  return (
    <div>
      <Delete onClick={modalOpen} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div
            style={{
              backgroundColor: "#fff",
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: 20
            }}
          >
            <p>Are you sure to delete data ?</p>
            <button onClick={() => deleteCountry()} className={classes.button}>
              Delete
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export const AllProvince = props => {
  return (
    <div>
      {props.name === "Add Province" ? (
        <div>
          <AddProvince countryId={props.countryId} />
        </div>
      ) : (
        <AllCity
          name={props.name}
          code={props.code}
          provinceId={props.provinceId}
          countryId={props.countryId}
        />
      )}
    </div>
  );
};

export const AllCity = props => {
  const classes = useStyles();
  const [click, setClick] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const setclick = () => {
    setClick(!click);
  };
  //Redux
  const dispatch = useDispatch();
  const cities = useSelector(state => state.cities.cities);
  // console.log(cities);
  useEffect(() => {
    dispatch(getCities());
  }, []);

  return (
    <div>
      <div
        className={classes.province}
        onClick={setclick}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <div style={{ opacity: visible ? 1 : 0 }}>
          <DataDetails name={props.name} code={props.code} type={"Province"} />
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>{props.name}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            position: "relative",
            width: "60px",
            opacity: visible ? 1 : 0
          }}
        >
          <div>
            <EditProvince
              provinceId={props.provinceId}
              countryId={props.countryId}
            />
          </div>
          <div>
            <DeleteProvince
              provinceName={props.name}
              provinceId={props.provinceId}
            />
          </div>
        </div>
      </div>

      {click && (
        <div>
          {cities.map((item, index) => (
            <div>
              {props.provinceId == item.province_id && (
                <div>
                  <City
                    name={item.city_name}
                    code={item.city_code}
                    id={item.id}
                    cityName={item.city_name}
                    provinceId={props.provinceId}
                  />
                  {index == cities.length - 1 && (
                    <AddCity provinceId={props.provinceId} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const EditProvince = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setProvinceName] = React.useState();
  const [code, setProvinceCode] = React.useState();

  const modalOpen = () => {
    setOpen(true);
  };

  const provinceName = e => {
    setProvinceName(e.target.value);
  };

  const provinceCode = e => {
    setProvinceCode(e.target.value);
  };

  const editProvince = () => {
    const data = {
      province_code: code,
      province_name: name,
      id: props.provinceId,
      country_id: props.countryId
    };
    const token = localStorage.getItem("token");
    axios
      .put(`http://backend-dev.cakra-tech.co.id/api/province`, data, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        console.log(response);
        alert(`Success update Data!!`);
      });
  };

  return (
    <div>
      <Edit onClick={() => modalOpen()} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div
            style={{
              backgroundColor: "#fff",
              height: 300,
              width: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "cneter",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <input
                type="text"
                placeholder=" Change Name"
                onChange={provinceName}
                className={classes.inputEdit}
              />
              <input
                type="text"
                placeholder=" Change Code"
                onChange={provinceCode}
                className={classes.inputEdit}
              />
              <button
                className={classes.button}
                style={{ margin: "auto" }}
                onClick={editProvince}
              >
                Edit
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export const DeleteProvince = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const deleteProvince = () => {
    const token = localStorage.getItem("token");
    return axios
      .delete(
        `http://backend-dev.cakra-tech.co.id/api/province/${props.provinceId}`,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      )
      .then(response => {
        if (response.data !== null) {
          alert(`success delete Province ${props.provinceName}`);
          window.location = "./Home";
        }
      });
  };

  return (
    <div>
      <Delete onClick={modalOpen} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div
            style={{
              backgroundColor: "#fff",
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: 20
            }}
          >
            <p>Are you sure to delete {props.provinceName} ?</p>
            <button onClick={() => deleteProvince()} className={classes.button}>
              Delete
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export const City = props => {
  const classes = useStyles();
  const [visible, setVisible] = React.useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <div
        style={{
          width: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: visible ? 1 : 0
        }}
      >
        <DataDetails
          name={props.name}
          code={props.code}
          type={"City"}
          color={"#fff"}
        />
      </div>
      <div className={classes.cities}>
        <div style={{ flex: 1, textAlign: "center" }}>{props.name}</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          width: "60px",
          opacity: visible ? 1 : 0
        }}
      >
        <div>
          <EditCity
            cityId={props.id}
            cityName={props.cityName}
            provinceId={props.provinceId}
          />
        </div>
        <div>
          <DeleteCity cityId={props.id} cityName={props.cityName} />
        </div>
      </div>
    </div>
  );
};

export const EditCity = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setCityName] = React.useState();
  const [code, setCityCode] = React.useState();

  const modalOpen = () => {
    setOpen(true);
  };

  const cityCode = e => {
    setCityCode(e.target.value);
  };

  const cityName = e => {
    setCityName(e.target.value);
  };

  const editCity = () => {
    const data = {
      id: props.cityId,
      city_code: code,
      city_name: name,
      province_id: props.provinceId
    };
    const token = localStorage.getItem("token");
    axios
      .put(`http://backend-dev.cakra-tech.co.id/api/city`, data, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        alert(`Success update City ${name}`);
      });
  };

  return (
    <div>
      <Edit onClick={() => modalOpen()} style={{ color: "#fff" }} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div
            style={{
              backgroundColor: "#fff",
              height: 300,
              width: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "cneter",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <input
                type="text"
                placeholder=" Change Name"
                onChange={cityName}
                className={classes.inputEdit}
              />
              <input
                type="text"
                placeholder=" Change Code"
                onChange={cityCode}
                className={classes.inputEdit}
              />
              <button
                className={classes.button}
                style={{ margin: "auto" }}
                onClick={editCity}
              >
                Edit
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export const DeleteCity = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  const deleteCity = () => {
    const token = localStorage.getItem("token");
    return axios
      .delete(`http://backend-dev.cakra-tech.co.id/api/city/${props.cityId}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(response => console.log(response));
  };

  return (
    <div>
      <Delete onClick={modalOpen} style={{ color: "#fff" }} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div
            style={{
              backgroundColor: "#fff",
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: 20
            }}
          >
            <p>Are you sure to delete {props.cityName} ?</p>
            <button onClick={() => deleteCity()} className={classes.button}>
              Delete
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export const AddCountry = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setNameCountry] = React.useState("tes");
  const [code, setCodeCountry] = React.useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeNameCountry = e => {
    setNameCountry(e.target.value);
  };

  const changeCodeCountry = e => {
    setCodeCountry(e.target.value);
  };

  const dispatch = useDispatch();

  const addCountry = () => {
    const data = {
      country_code: code,
      country_name: name
    };
    dispatch(postCountry(data));
  };

  return (
    <div style={{ position: "fixed", left: "80%", bottom: "5%", right: "5%" }}>
      <div
        style={{
          height: 70,
          width: 120,
          border: "2px dashed #a9bd7d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
        }}
        onClick={handleOpen}
      >
        Add Country
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div
            style={{
              backgroundColor: "#fff",
              height: 300,
              width: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "cneter",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <input
                placeholder="Country Name"
                className={classes.inputEdit}
                onChange={changeNameCountry}
              />
              <input
                placeholder="Country Code"
                className={classes.inputEdit}
                onChange={changeCodeCountry}
              />
              <button
                onClick={addCountry}
                className={classes.button}
                style={{ margin: "auto" }}
              >
                addCountry
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export const AddProvince = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setNameProvince] = React.useState("tes");
  const [code, setCodeProvince] = React.useState();
  const [id, setCountryId] = React.useState(props.countryId);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeNameProvince = e => {
    setNameProvince(e.target.value);
  };

  const changeCodeProvince = e => {
    setCodeProvince(e.target.value);
  };

  const dispatch = useDispatch();

  const addProvince = () => {
    const data = {
      province_code: code,
      province_name: name,
      country_id: id
    };
    dispatch(postProvince(data));
  };

  return (
    <div>
      <div
        className={classes.provinceNone}
        style={{ color: props.color ? props.color : "#fff" }}
        onClick={handleOpen}
      >
        Add Province
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div
            style={{
              backgroundColor: "#fff",
              height: 300,
              width: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "cneter",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <input
                placeholder="Province Name"
                className={classes.inputEdit}
                onChange={changeNameProvince}
              />
              <input
                placeholder="Province Code"
                className={classes.inputEdit}
                onChange={changeCodeProvince}
              />
              <button
                onClick={addProvince}
                className={classes.button}
                style={{ margin: "auto" }}
              >
                Add Province
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export const AddCity = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setNameCity] = React.useState("tes");
  const [code, setCodeCity] = React.useState();
  const [id, setProvinceId] = React.useState(props.provinceId);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeNameCity = e => {
    setNameCity(e.target.value);
  };

  const changeCodeCity = e => {
    setCodeCity(e.target.value);
  };

  const dispatch = useDispatch();

  const addCity = () => {
    const data = {
      city_code: code,
      city_name: name,
      province_id: id
    };
    dispatch(postCity(data));
  };

  return (
    <div>
      <div className={classes.addCities} onClick={handleOpen}>
        Add City
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div
            style={{
              backgroundColor: "#fff",
              height: 300,
              width: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "cneter",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <input
                placeholder="City Name"
                className={classes.inputEdit}
                onChange={changeNameCity}
              />
              <input
                placeholder="City Code"
                className={classes.inputEdit}
                onChange={changeCodeCity}
              />
              <button
                onClick={addCity}
                className={classes.button}
                style={{ margin: "auto" }}
              >
                Add City
              </button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
