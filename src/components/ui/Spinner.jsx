export default function Spinner() {
  return (
    <div
      className="text-surface inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary-400 motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    />
  );
}