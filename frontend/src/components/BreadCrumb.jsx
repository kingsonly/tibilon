import React from "react";
import arrowForward from "../assests/arrow-forward.svg";
import arrowBackTurn from "../assests/arrow-back-turn.svg";
import { useNavigate } from "react-router-dom";

export default function BreadCrumb({ breadCrumbs }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 mb-4">
      <button onClick={() => navigate(-1)}>
        <img src={arrowForward} alt={arrowForward} />
      </button>
      {breadCrumbs?.map((crumb, index) => (
        <>
          <a href={crumb?.link} className="opacity-60">
            <span
              style={{
                fontWeight: `${index == breadCrumbs.length - 1 && 700}`,
              }}
            >
              {crumb?.name}
            </span>
          </a>
          {/* Prevent it from showing after last crumb title */}
          {index != breadCrumbs.length - 1 && (
            <a href={crumb?.link} className="opacity-60">
              <img src={arrowBackTurn} alt={arrowBackTurn} />
            </a>
          )}
        </>
      ))}
    </div>
  );
}
