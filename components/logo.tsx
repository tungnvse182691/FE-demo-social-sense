import Image from "next/image"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className = "", width = 40, height = 40 }: LogoProps) {
  return (
    <Image
      src="/logo-icon.png"
      alt="Logo"
      width={width}
      height={height}
      className={className}
      style={{ mixBlendMode: "multiply" }}
      priority
    />
  )
}
