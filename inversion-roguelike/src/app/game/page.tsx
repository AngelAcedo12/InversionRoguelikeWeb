"use client";
import { TimeController } from "@/core/controllers/TimeController";

import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {}, []);

  return (
    <div>
      <button onClick={TimeController.activeFastFoward}>
        Active fastForward
      </button>
      <button onClick={TimeController.disableFastFoward}>
        {" "}
        Desactive fastForward
      </button>
    </div>
  );
}
