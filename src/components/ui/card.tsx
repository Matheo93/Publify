// src/components/ui/card.tsx
export const Card = ({ 
    children, 
    className = '' 
  }: { 
    children: React.ReactNode 
    className?: string 
  }) => {
    return (
      <div className={`bg-white rounded-lg shadow-md ${className}`}>
        {children}
      </div>
    )
  }