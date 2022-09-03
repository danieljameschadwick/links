import React from "react";
import dynamic from "next/dynamic";

interface Props {
  children: React.ReactNode;
}

const NoSSRWrapper: React.FC<Props> = ({ children }) => {
  return (
    <>{children}</>
  );
}

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false
});
