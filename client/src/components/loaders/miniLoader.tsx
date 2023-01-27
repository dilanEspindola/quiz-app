import styles from "./miniLoader.module.css";

export const MiniLoader = () => {
  return (
    <div className="absolute left- top-[0px] bg-[#b6b6b641] w-full h-full flex items-center justify-center">
      <div className={styles.loader}></div>
    </div>
  );
};
