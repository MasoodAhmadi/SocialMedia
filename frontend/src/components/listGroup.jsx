import { useState } from "react";
import { initialTabs as tabs } from "../data/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "react-bootstrap";

export default function ListGroups() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <Container>
      <div
        style={{
          width: "100%",
          height: "360px",
          borderRadius: "10px",
          background: "white",
          overflow: "hidden",
          boxShadow:
            "0 1px 1px hsl(0deg 0% 0% / 0.075),\n    0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075),\n    0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <nav
          style={{
            background: "white",
            padding: "10px 5px 0px",
            borderRadius: "10px",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
            borderBottom: "1px solid white",
            height: "44px",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: ["0", "10px 15px"],
              margin: "1px",
              marginTop: "-2px",
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 500,
              fontSize: "20px",
              display: "flex",
              width: "100%",
              borderRadius: "5px",
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
              position: "relative",
              justifyContent: "space-between",
              alignItems: "center",
              background: "white",
              cursor: "pointer",
              userSelect: "none",
              flex: 1,
              height: "24px",
            }}
          >
            {tabs.map((item) => (
              <li
                style={{
                  li_selected: { background: "#eee" },
                  listStyle: "none",
                  padding: ["0", "10px 15px"],
                  margin: "1px",
                  marginTop: "-2px",
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 500,
                  fontSize: "20px",
                  display: "flex",
                  width: "100%",
                  borderRadius: "5px",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                  position: "relative",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "white",
                  cursor: "pointer",
                  userSelect: "none",
                  flex: 1,
                  height: "24px",
                }}
                key={item.label}
                className={item === selectedTab ? "selected" : ""}
                onClick={() => setSelectedTab(item)}
              >
                {`${item.icon} ${item.label}`}
                {item === selectedTab ? (
                  <motion.div
                    className="underline"
                    style={{
                      position: "absolute",
                      bottom: "-1px",
                      left: "0",
                      right: "0",
                      height: "1px",
                      background: "var(--accent)",
                    }}
                    layoutId="underline"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
        <main
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "128px",
            flexGrow: 1,
            userSelect: "none",
          }}
        >
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={selectedTab ? selectedTab.icon : "empty"}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {selectedTab ? selectedTab.icon : "😋"}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </Container>
  );
}
