export default function Upload({ className, width, height, fill }) {
  return (
    <svg
      width={width || "32"}
      height={height || "32"}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2046_9382)">
        <path
          d="M11.9998 21.3333H19.9998V13.3333H25.3332L15.9998 4L6.6665 13.3333H11.9998V21.3333ZM6.6665 24H25.3332V26.6667H6.6665V24Z"
          fill={fill || "#777777"}
        />
      </g>
      <defs>
        <clipPath id="clip0_2046_9382">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}