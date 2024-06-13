"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

function LinkEffect({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  return (
    <Link href={link} className="inline-block h-5 overflow-hidden">
      <motion.div
        whileHover={{
          y: -20,
          transition: {
            duration: 0.25,
          },
        }}
      >
        <span className="flex h-5 items-center">{children}</span>
        <span className="flex h-5 items-center">{children}</span>
      </motion.div>
    </Link>
  );
}

export default LinkEffect;
