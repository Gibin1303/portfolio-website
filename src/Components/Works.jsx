// import React from "react";
// import Portfolio from "../Components/Pinned";

// const Works = () => {
//   return (
//     <section className="relative w-11/12 bg-luxury-dark">
//       <Portfolio />
//     </section>
//   );
// };

// export default Works;



import React from "react";
import Portfolio from "../Components/Pinned";
import "../styles/hero.css"

const Works = () => {
  return (
    <section className="relative box flex w-full min-h-screen bg-luxury-dark overflow-hidden">
      <Portfolio/>
    </section>
  );
};

export default Works;
