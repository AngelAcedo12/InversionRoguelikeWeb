"use client";

import { TimeController } from "@/core/controllers/TimeController";
import { useGameContext } from "@/services/gameContext";

import React, { useEffect } from "react";

export default function Page() {
  const {} = useGameContext();
  useEffect(() => {}, []);

  return (
    <div>
      <section>
        <div className="flex flex-row gap-10 p-4 text-xl font-extrabold">
          <div className="flex flex-row gap-2">
            <span>MONEY:</span>
            <span>{TimeController.getInstance().day}</span>
          </div>

          <div className=""></div>
        </div>
      </section>
    </div>
  );
}
