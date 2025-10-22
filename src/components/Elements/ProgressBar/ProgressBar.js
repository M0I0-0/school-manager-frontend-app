import React, { useEffect, useState } from "react";
import { lighten, withStyles } from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";

const BorderLinearProgress = withStyles(
  {
    root: {
      height: 6,
      borderRadius: 20,
      backgroundColor: lighten("#006cb0", 0.8),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: "#006cb0",
    },
  },
  { index: 1 }
)(LinearProgress);
const ProgressBar = (props) => {
  const { open } = props;
  const [completed, setCompleted] = useState(0);
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (open) {
      if (mounted) {
        setShow(open);
        setCompleted(0);
        setStep(0);
      }
    } else {
      if (mounted) {
        setCompleted(100);
      }
    }
    return () => {
      mounted = false;
    };
  }, [open]);

  useEffect(() => {
    let mounted = true;

    if (completed === 100) {
      setTimeout(function () {
        if (mounted) {
          setShow(false);
        }
      }, 600);
    }

    if (completed <= 97) {
      const fakeProgress = () => {
        if (mounted) {
          setStep((prev) => prev + 1);
        }
      };
      const randomDiff = (Math.floor(Math.random() * 2) === 1 ? 1 : -1) * Math.floor(Math.random() * 5) + 1; // this will get a number between 1 and 5;
      const timeout = Math.floor(Math.exp((step + randomDiff) / 10));
      const timer = setInterval(fakeProgress, timeout);
      return () => {
        clearInterval(timer);
      };
    }
    return () => {
      mounted = false;
    };
  }, [completed, step]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setCompleted((oldCompleted) => {
        if (oldCompleted >= 97) {
          return oldCompleted;
        }
        const diff = 1 - Math.exp(-(step + 1) / 10);
        return Math.min(oldCompleted + diff, 100);
      });
    }
    return () => {
      mounted = false;
    };
  }, [step]);

  return show ? (
    <BorderLinearProgress variant="determinate" value={completed} style={{ width: "100%" }} />
  ) : null;
};

ProgressBar.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ProgressBar;
