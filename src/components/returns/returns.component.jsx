import "./returns.component.css";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div className="return_container">
        <h3 style={{ margin: "20px" }}>Our Policy</h3>
        <div className="container_faq">
          <div>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}
                >
                  Frequently Asked Questions
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p className="fw-bold">What can I return?</p>
                  <p>
                    {" "}
                    You may return most new, unopened items sold and fulfilled
                    by Amazon within 30 days of delivery for a full refund.
                  </p>
                  <p className="fw-bold"> When will I get my refund?</p>
                  <p>
                    {" "}
                    Usually in about 2-3 weeks. Most refunds are fully refunded
                    within 7 days after we receive and process your return.
                  </p>
                  <p className="fw-bold">
                    {" "}
                    Does Amazon offer replacements and exchanges?
                  </p>
                  <p>
                    Yes, you can create replacement and exchange orders from
                    this page by clicking Return Items and following the
                    instructions. If you received a damaged or defective item,
                    we’ll ship you a replacement of the exact item. If you would
                    like to exchange an item for another, you can exchange for a
                    different size or color or for an item in your Cart.
                  </p>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}
                >
                  Return Policy
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Update{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Free, easy returns on millions of items at over 18,000
                  drop-off locations. You may return most new, unopened items
                  sold and fulfilled by Amazon within 30 days of delivery for a
                  full refund. For the 2022 holiday season, most of the items
                  purchased between 11 October and 25 December 2022 can be
                  returned until 31 January 2023. Learn more about Amazon’s
                  Return Policy
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}
                >
                  Gift Returns
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Start a gift return by using the order number e.g.
                  123-1234567-1234567
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}
                >
                  Did you know…
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p className="fw-bold">Can't return an item?</p>
                  Sell or Trade-In the item Sell your item for cash to other
                  Amazon customers (no listing fees for individual seller, set
                  your own price, pay only when your item sells) Trade-in your
                  item for an Amazon.com Gift Card (get an offer immediately,
                  ship your item for free, get an Amazon.com Gift Card).
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
