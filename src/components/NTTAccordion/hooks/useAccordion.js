import { useState } from "react"

const ARIA_EXPANDED = "aria-expanded"
const ARIA_HIDDEN = "aria-hidden"

const getPanelContent = (panel) => {
  try {
    debugger;
    if (panel === null || panel === undefined) throw new Error("Cannot get content of undefined");
    if (panel.children.length > 0) {
      return panel.lastChild;
    }
  } catch (error) {
    console.error(error.message);
  }        
}


const useAccordion = () => {
  const [activePanel, setActivePanel] = useState(0);

  const accordionClickHandler = (e) => {
    debugger;
    const activePanel = e.target.closest("[data-panel]");    
    if (!activePanel) return;
    setActivePanel(activePanel.id);
    toggleAccordion(activePanel);
  }

  const toggleAccordion = (activePanel) => {
    
    // let panel = nextActivePanel.querySelector(`.${styles.content}`);
    
    const button = activePanel.querySelector("button");
    const content = getPanelContent(activePanel);

    const activePanelIsOpened = button.getAttribute(ARIA_EXPANDED);

    if (activePanelIsOpened === "true") {
      button.setAttribute(ARIA_EXPANDED, false);
      content.setAttribute(ARIA_HIDDEN, true);
    } else {
      button.setAttribute(ARIA_EXPANDED, true);
      content.setAttribute(ARIA_HIDDEN, false);
    }
  }

  return {
    accordionClickHandler,
    activePanel
  }
}

export default useAccordion;