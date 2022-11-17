import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
Round.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
function Round(props) {
  const { value } = props;
  return (
    <>
      <Box sx={{ position: "relative", display: "inline-flex", width: "200px", height: "200px" }}>
        {console.log("render time " + value)}
        <CircularProgress variant="determinate" {...props} size={200} color={`${value > 50 ? "success" : "info"}`} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" fontSize={100} color={"burlywood"}>
            {`${Math.round(props.value / 10)}`}
          </Typography>
        </Box>
      </Box>
    
    </>
  );
}

export default React.memo(Round);
