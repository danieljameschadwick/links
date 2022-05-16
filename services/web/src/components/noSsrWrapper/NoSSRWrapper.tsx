import dynamic from "next/dynamic";
import React from "react";

type Props = {
  children: React.ReactNode;
}

const NoSSRWrapper: React.FC<Props> = ({ children }) => <>{ children }</>;

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false
});
