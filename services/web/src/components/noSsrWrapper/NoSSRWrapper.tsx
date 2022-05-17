import React from "react";
import dynamic from "next/dynamic";

type Props = {
  children: React.ReactNode;
}

const NoSSRWrapper: React.FC<Props> = ({ children }) => <>{ children }</>;

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false
});
