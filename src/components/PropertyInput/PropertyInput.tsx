import styles from "./PropertyInput.module.css";

export interface PropertyInputStaticProps {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  sliderMin: number;
  sliderMax: number;
}

interface PropertyInputProps extends PropertyInputStaticProps {
  value: number | undefined;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function PropertyInput({ label, value, min, max, step, unit, sliderMin, sliderMax, handleChange }: PropertyInputProps) {
  return (
    <div className={styles["property-input"]}>
      <label>
        <span className={styles.name}>{label}</span>
        <input type="number" name={label} min={min} max={max} step={step} value={value} onChange={handleChange} />
        {!!unit && <div className={styles.unit}>{unit}</div>}
      </label>
      <input
        className={styles.slider}
        type="range"
        min={sliderMin}
        max={sliderMax}
        name={label}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
