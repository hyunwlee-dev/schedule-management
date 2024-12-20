'use client';

import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

const MD_SIZE = 768;

const VISIBLE_CLASSNAME = 'fixed bg-white h-full mt-[58px] w-full';
const HIDDEN_CLASSNAME = 'hidden';

type CreateContextType = {
  handleToggle: () => void;
  toggle: boolean;
  sidebarStyle: string;
};

export const SidebarContext = createContext<CreateContextType>({
  handleToggle: () => {},
  toggle: false,
  sidebarStyle: HIDDEN_CLASSNAME,
});

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [toggle, setToggle] = useState(false);
  const [sidebarStyle, setSidebarStyle] = useState(HIDDEN_CLASSNAME);

  const handleToggle = () => {
    setToggle((toggle) => {
      const updateToggle = !toggle;

      if (updateToggle) {
        setSidebarStyle(VISIBLE_CLASSNAME);

        return updateToggle;
      }

      setSidebarStyle(HIDDEN_CLASSNAME);
      return updateToggle;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MD_SIZE) {
        setSidebarStyle(HIDDEN_CLASSNAME);
        setToggle(false);

        return;
      }

      if (toggle) {
        setSidebarStyle(VISIBLE_CLASSNAME);
        return;
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [toggle]);

  return <SidebarContext.Provider value={{ handleToggle, toggle, sidebarStyle }}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = () => useContext(SidebarContext);
