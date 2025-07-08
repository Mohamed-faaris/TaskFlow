import React from 'react';

const Drawer = ({ show, onClose, children }) => {
  return (
    <div className={`drawer ${show ? 'show' : ''}`}>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className="drawer-content">
        <button className="drawer-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
