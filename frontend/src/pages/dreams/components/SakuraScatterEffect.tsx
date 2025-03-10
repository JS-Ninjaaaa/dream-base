const SakuraScatterEffect = () => {
  const sakuraImagePaths = Array(3)
    .fill([
      "/assets/s1.png",
      "/assets/s2.png",
      "/assets/s3.png",
      "/assets/s4.png",
      "/assets/s5.png",
      "/assets/s6.png",
      "/assets/s7.png",
      "/assets/s8.png",
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
