"use client";

import Snowfall from "react-snowfall";

export function Background() {
  return (
    <Snowfall
      color="#dee4fd"
      snowflakeCount={29}
      wind={[-0.5, 0.5]}
      speed={[0.5, 1.5]}
      radius={[0.5, 2]}
      style={{
        inset: 0,
        zIndex: -50,
        position: 'absolute',
      }}
    />
  );
}