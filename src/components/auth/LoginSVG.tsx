// src/components/auth/LoginSVG.tsx
export const LoginSVG = ({ className }: { className?: string }) => (
    <svg 
      className={className}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Version simplifiée de l'illustration de login */}
      <circle cx="150" cy="150" r="100" fill="#4481eb" opacity="0.3" />
      <path
        d="M150 50C94.77 50 50 94.77 50 150s44.77 100 100 100 100-44.77 100-100S205.23 50 150 50zm0 30c22.09 0 40 17.91 40 40s-17.91 40-40 40-40-17.91-40-40 17.91-40 40-40zm0 160c-33.08 0-62.23-16.15-80-40.89 19.05-29.62 52.23-49.11 90-49.11 37.77 0 70.95 19.49 90 49.11-17.77 24.74-46.92 40.89-80 40.89z"
        fill="#4481eb"
      />
    </svg>
  );