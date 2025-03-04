import React from "react";
import "../../../App.css"; // CSS を適用

// 桜の花びらの画像リスト

const sakuraImagesQuadrupled = Array(10).fill([
    "/assets/s1.png",
    "/assets/s2.png",
    "/assets/s3.png",
    "/assets/s4.png",
  ]).flat();

const SakuraEffect = () => {
  return (
    <ul className="sakura">
      {sakuraImagesQuadrupled.map((imgSrc, index) => (
        <li key={index}>
          <img src={imgSrc} alt={`sakura-${index}`} />
        </li>
      ))}
    </ul>
  );
};

export default SakuraEffect;

