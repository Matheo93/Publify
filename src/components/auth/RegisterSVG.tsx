// src/components/auth/RegisterSVG.tsx
export const RegisterSVG = ({ className }: { className?: string }) => (
    <svg 
      className={className}
      viewBox="0 0 300 300"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Version simplifiée de l'illustration d'inscription */}
      <rect x="50" y="50" width="200" height="200" rx="20" fill="#4481eb" opacity="0.3" />
      <path
        d="M90 130h120v20H90v-20zm0 40h120v20H90v-20zm60-80h60v20h-60V90z"
        fill="#4481eb"
      />
      <circle cx="120" cy="100" r="30" fill="#4481eb" />
    </svg>
  );