import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

const CodeDisplay = ({ code }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(code || "Zde bude vygenerovaný kód...")
      .then(() => console.log("Text copied to clipboard"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  const renderTooltip = (props) => (
    <Tooltip id="copy-tooltip" {...props}>
      Zkopíruj do schránky{" "}
    </Tooltip>
  );

  return (
    <div className="code-display">
      <pre>{code || "Zde bude vygenerovaný kód..."}</pre>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <button onClick={handleCopyToClipboard} className="copy-button">
          <FontAwesomeIcon icon={faClipboard} />
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default CodeDisplay;
