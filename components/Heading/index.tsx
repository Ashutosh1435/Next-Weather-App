import React from "react";
import styles from "../../app/page.module.css";

interface Props {}
const Heading: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <h1 className={styles.heading}>Weather APP</h1>
      <p className={styles.sub_heading}>
        Introducing a sleek weather information application – simply input
        the&nbsp;
        <b>city name</b> and &nbsp;
        <b>country code</b>, and instantly receive a concise weather report for
        your specified location.
      </p>
    </React.Fragment>
  );
};

export default Heading;
