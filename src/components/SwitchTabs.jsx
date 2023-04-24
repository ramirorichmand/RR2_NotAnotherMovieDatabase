import React from 'react'

const SwitchTabs = ({data, activeTab, setActiveTab}) => {
  return (
    <>
        {data.map((tab, tabIndex) => (
            <button key={crypto.randomUUID()} onClick={() => setActiveTab(tabIndex)} className={`capitalize cursor-pointer w-[100px] py-2 rounded-full ${tabIndex === activeTab ? "bg-grd text-white  duration-500 ease-in-out" : null}`}>{tab}</button>
        ))}
    </>
  )
}

export default SwitchTabs