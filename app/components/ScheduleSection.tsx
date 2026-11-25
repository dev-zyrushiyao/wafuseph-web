import React from "react";

export default function ScheduleSection() {
  return (
    <section id="schedule" className="schedule w-full bg-secondary p-20">
      <div className="title-wrapper w-fit">
        <h6 className="text-end text-xl">スケジュール</h6>
        <h2>Schedule</h2>
      </div>

      <div>
        <ul className="flex flex-col lg:gap-20 p-10">
          {Array.from({ length: 5 }, (_, index) => {
            return (
              <li
                key={index}
                className=" p-5 border-b-10 border-b-border-color border-dashed"
              >
                <div className="flex flex-col">
                  <span className="text-base">Monday</span>
                  <div className="flex lg:flex-row flex-col-reverse lg:gap-10 gap-5">
                    <span className="lg:text-8xl text-4xl">{`9.6.26`}</span>
                    <span className="text-3xl font-serif">{`Monster Hunter Stream`}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
