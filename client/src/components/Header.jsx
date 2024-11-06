import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <div className="h-20 w-full p-10 top-0 sticky shadow flex justify-between items-center bg-light">
      <h1>MoneyBank</h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/pricing">Pricing</Link>
      </div>
    </div>
  );
};

export default Header;
