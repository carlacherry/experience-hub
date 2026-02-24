const logoSvg = "/73fbc90ad503c86c69277d1299a0bbc5d23d0aa5.svg";

interface LogoPepsiChatProps {
  className?: string;
}

export function LogoPepsiChat({ className }: LogoPepsiChatProps) {
  return (
    <img
      src={logoSvg}
      alt="PEPSI CHAT"
      className={className}
      style={{ width: 121, height: 24 }}
    />
  );
}
