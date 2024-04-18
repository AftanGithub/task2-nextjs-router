"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  icon?: React.ReactNode;
  title: string;
  href: string;
};

const LinkItem = (props: Props) => {
  const { title } = props;
  const pathname = usePathname();
  return (
    <Link
      className={`group relative flex items-center gap-2.5 rounded-sm px-3 py-2 font-medium  duration-300 ease-in-out  hover:text-black-500 hover:bg-white ${pathname === props.href ? 'bg-white text-gray-900' : ''} `}
      href={props.href}
    >
      <div className="">{props.icon}</div>
      <p>{title}</p>
    </Link>
  );
};

export default LinkItem;
