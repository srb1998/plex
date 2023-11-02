"use client"
import { useState } from "react"

const SwitchTabs = ({ data,onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left,setLeft] = useState(0);

    const activeTab = (tab,index) => {
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChange(tab,index);
    }

  return (
    <div className="h-[34px] bg-white rounded-full p-[2px] font-semibold">
      {data && (
        <div className="flex items-center h-[30px] relative">
          {data.map((tab, index) => (
            <span
              key={index}
              className={`tabItem ${selectedTab === index ? "active" : ""}`}
              onClick={() => activeTab(tab, index)}
            >
              {tab}
            </span>
          ))}
          <span className="movingBg" style={{ left }}></span>
        </div>
      )}
    </div>
  );
}

export default SwitchTabs