import React from "react";
import "../css/common.css"; // CSS を適用

// 桜の花びらの画像リスト
const sakuraImages = [
  "/assets/s1.png",
  "/assets/s2.png",
  "/assets/s3.png",
  "/assets/s4.png",
  "/assets/s1.png",
  "/assets/s2.png",
  "/assets/s3.png",
  "/assets/s4.png",
  "/assets/s1.png",
  "/assets/s2.png",
  "/assets/s3.png",
  "/assets/s4.png",
  "/assets/s1.png",
  "/assets/s2.png",
  "/assets/s3.png",
  "/assets/s4.png",
  "/assets/s1.png",
  "/assets/s2.png",
  "/assets/s3.png",
  "/assets/s4.png",
];

const SakuraEffect = () => {
  return (
    <ul className="sakura">
      {sakuraImages.map((imgSrc, index) => (
        <li key={index}>
          <img src={imgSrc} alt={`sakura-${index}`} />
        </li>
      ))}
    </ul>
  );
};

export default SakuraEffect;

