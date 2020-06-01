import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fade, makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Pageview from "@material-ui/icons/Pageview";

const useStyles = makeStyles(theme => ({
  pageviewContainer: {
    width: "60px",
    textAlign: "center"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export const DataDetails = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setNameProvince] = React.useState("tes");
  const [code, setCodeProvince] = React.useState();

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
      province_name: name
    };
  };

  return (
    <div>
      <div className={classes.pageviewContainer}>
        <Pageview
          onClick={handleOpen}
          style={{ color: props.color ? props.color : "" }}
        />
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        className={classes.modal}
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
              justifyContent: "center",
              flexDirection: "column",
              fontSize: "15px"
            }}
          >
            <div
              style={{
                width: "50%",
                height: "30px",
                backgroundColor: "#a9bd7d",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {props.type ? props.type : ""} Name
            </div>
            <p>{props.name}</p>
            <div
              style={{
                width: "50%",
                height: "30px",
                backgroundColor: "#a9bd7d",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {props.type ? props.type : ""} Code
            </div>
            <p>{props.code}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
