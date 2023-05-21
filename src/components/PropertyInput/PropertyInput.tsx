import styles from "./PropertyInput.module.scss";

interface PropertyInputProps {
  label: string;
  value: number | undefined;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function PropertyInput({
  label,
  value,
  min,
  max,
  step,
  unit,
  handleChange,
}: PropertyInputProps) {
  return (
    <label className={styles["property-input"]}>
      <span>{label}</span>
      <input
        type="number"
        name={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
      {!!unit && <div className={styles.unit}>{unit}</div>}
    </label>
  );
}
