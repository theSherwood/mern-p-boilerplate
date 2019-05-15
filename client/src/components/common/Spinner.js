import React from "react";
import "./Spinner.css";

export default function Spinner(props) {
  const { spinnerStyles } = props;
  const styles = {
    width: "100px",
    height: "70px",
    margin: "auto",
    marginTop: "40px",
    marginBottom: "40px",
    ...spinnerStyles
  };

  return (
    <div className="spinner-container" style={styles}>
      <div>
        <div>
          <div>
            <div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
