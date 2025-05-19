import React from "react";

type CrtEffectProps = {
  children: React.ReactNode;
  enabled?: boolean;
  flicker?: boolean;
};

const CrtEffect: React.FC<CrtEffectProps> = ({
  children,
  enabled = true,
  flicker = false,
}) => {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className={`crt ${flicker ? "animate-flicker" : ""}`}>{children}</div>
  );
};

export default CrtEffect;
