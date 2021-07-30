import {
  Accordion, AccordionDetails, AccordionSummary, Box, makeStyles, Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import React from "react";
import colors from "../constants/colors";
import Status from "./Status";

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  const classes = useStyles();

  const buildBlocks = (blocks) => {
    if (blocks === undefined) {
      return <Typography>Impossible to retreive data.</Typography>
    } else if (!blocks.length) {
      return <Typography>No data to show.</Typography>
    }
    return blocks.map((block, index) => {
      return <Box key={index} className={classes.block}>
        <Typography className={classes.block_id}>{block.id.padStart(3, '0')}</Typography>
        <Typography>{block.attributes.data}</Typography>
      </Box>
    })
  }
  
  return (
    <Accordion
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <AccordionSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box className={classes.summaryContent}>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              {node.name || "Unknown"}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.secondaryHeading}
            >
              {node.url}
            </Typography>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.block_wrapper}>
          {buildBlocks(node.blocks)}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",
    "&:before": {
      backgroundColor: "unset",
    },
  },
  summary: {
    padding: "0 24px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      paddingLeft: 0,
      paddingRight: 12,
      top: -10,
      marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.faded,
    lineHeight: 2,
  },
  block_wrapper: {
    width: '100%'
  },
  block: {
    background: 'rgba(0,0,0,.12)',
    padding: '8px',
    borderRadius: '2px',
    margin: '4px 0'
  },
  block_id: {
    color: '#304FFE',
    fontSize: '10px'
  }
}));

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
};

export default Node;
