"use client";

import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import { AnimationConfig } from "lottie-web";
import { LottieFile } from "../interfaces/lotteInterface";
import lotteFile from "@animations/underConstruction.json";
import { Timer, RefreshCw } from "lucide-react";

interface Props {
  title?: string;
  lotteFile: LottieFile;
  estimatedTime?: number; // in minutes
  onRefresh?: () => void;
}

const UnderConstruction: React.FC<Props> = ({
  title = "Under Construction",

  estimatedTime = 60,
  onRefresh,
}) => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<any>(null);
  const [timeLeft, setTimeLeft] = useState<number>(estimatedTime);

  useEffect(() => {
    if (animationContainer.current) {
      animationInstance.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: lotteFile,
      });
    }

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // Update every minute

    return () => {
      if (animationInstance.current) {
        animationInstance.current.destroy();
      }
      clearInterval(timer);
    };
  }, [lotteFile]);

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="under-construction">
      <div className="content">
        <h1>{title}</h1>
        <div className="message">
          <p className="primary">
            We are currently working on some exciting changes.
          </p>
          <p className="secondary">
            Please check back soon to apply for A/L using this site.
          </p>
        </div>

        <div className="info-section">
          <div className="time-estimate">
            <Timer className="icon" />
            <span>Estimated return: 3.00 P.M</span>
          </div>
          <button onClick={handleRefresh} className="refresh-button">
            <RefreshCw className="icon" />
            Refresh Page
          </button>
        </div>
      </div>

      <div className="animation-container" ref={animationContainer}></div>
    </div>
  );
};

export default UnderConstruction;
