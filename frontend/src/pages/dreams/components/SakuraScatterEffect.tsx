const SakuraScatterEffect = () => {
  const sakuraImagePaths = Array(3)
    .fill([
      "/assets/images/s1.png",
      "/assets/images/s2.png",
      "/assets/images/s3.png",
      "/assets/images/s4.png",
      "/assets/images/s5.png",
      "/assets/images/s6.png",
      "/assets/images/s7.png",
      "/assets/images/s8.png",
    ])
    .flat();

  return (
    <ul className="sakura">
      {sakuraImagePaths.map((path, index) => (
        <li key={index}>
          <img src={path} alt={`sakura-${index}`} />
        </li>
      ))}
    </ul>
  );
};

export default SakuraScatterEffect;
