import React from "react";
import PendingStep from "../../assets/pending_step.svg";
import CompletedStep from "../../assets/completed_step.svg";
import CurrentStep from "../../assets/current_step.svg";
import { progressBar } from "../../constants/progressBar";
import "./style.css";

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="progress-bar">
      {progressBar.map((item, index) => {
        const isCompleted = item?.id < currentStep;
        const isCurrent = item?.id === currentStep;

        return (
          <div key={item.id} className="progress-bar-item">
            <div>
              <div className="progress-bar-icon">
                <img 
                  src={isCompleted ? CompletedStep : isCurrent ? CurrentStep : PendingStep} 
                  alt="pending-step" 
                  className={isCurrent && "current-step"}
                />
              </div>
            </div>
            <div className="text-sm">{item.title}</div>
            {index !== progressBar.length - 1 
              && <div className={`progress-line ${isCompleted ? "progress-completed-line" : ""}`}></div>
            }
          </div>
        )
      })}
    </div>
  );
};

export default ProgressBar;