"use client";

import Image from "next/image";
import { useState } from "react";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  username?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10", 
  lg: "w-12 h-12"
};

export default function Avatar({ 
  src, 
  alt = "Usuario", 
  username,
  size = "md",
  className = "" 
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generar iniciales del username
  const getInitials = (name?: string) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Generar color basado en username
  const getAvatarColor = (name?: string) => {
    if (!name) return "bg-gray-500";
    const colors = [
      "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
      "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Mostrar fallback si no hay imagen o hubo error
  if (!src || hasError) {
    return (
      <div className={`
        ${sizeClasses[size]} 
        ${getAvatarColor(username)} 
        rounded-full 
        flex 
        items-center 
        justify-center 
        text-white 
        font-semibold
        ring-2 
        ring-blue-400
        ${className}
      `}>
        <span className={size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm"}>
          {getInitials(username)}
        </span>
      </div>
    );
  }

  return (
    <div className={`
      ${sizeClasses[size]} 
      relative 
      rounded-full 
      overflow-hidden 
      ring-2 
      ring-blue-400
      ${className}
    `}>
      {isLoading && (
        <div className={`
          absolute 
          inset-0 
          bg-gray-300 
          animate-pulse
        `} />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`
          object-cover 
          transition-opacity 
          duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        onLoad={() => setIsLoading(false)}
        sizes="(max-width: 768px) 32px, 40px"
      />
    </div>
  );
}
