// import React from "react";

// const Buttons = () => {
//   const FILE_ID = "YOUR_GOOGLE_DRIVE_FILE_ID_HERE";
//   const downloadUrl = `https://drive.google.com/file/d/1FrSgAkl15AzvsSdYUdgrq0p8694_pHp8/view?usp=sharing`;

//   const handleDownload = () => {
//     window.open(downloadUrl, "_blank", "noopener,noreferrer");
//   };

//   return (
//       <div className="absolute bottom-60 sm:-bottom-96 md:bottom-20 left-6 md:left-20">
//        <button onClick={handleDownload} className="download-btn cursor-pointer bg-luxury-gold absolute t-20%">
//           View Resume
//          </button>
//       </div>
//   );
// };

// export default Buttons;




import React from "react";

const Buttons = ({ fileId = "1FrSgAkl15AzvsSdYUdgrq0p8694_pHp8" }) => {
  const viewUrl = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;

  return (
    <div className="w-full sm:w-auto flex justify-center sm:justify-start">
      <a
        href={viewUrl}
        target="_blank"
        rel="noopener noreferrer"
      className="download-btn"
      >
        {/* Eye/View Icon
        <svg
          className="w-5 h-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg> */}
        <span>View Resume</span>
      </a>
    </div>
  );
};

export default Buttons;
