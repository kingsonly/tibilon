import React from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component'

export default function ProjectCard({ projectData,from,fetchMoreDataProps,hasMore }) {
  const fetchMoreData = () => {
    fetchMoreDataProps();
  };
  return (
    <div className="">
      <InfiniteScroll
              dataLength={projectData.length}
              next={fetchMoreDataProps}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              initialScrollY ={1}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              
            >
      {projectData.length > 0
        ? projectData.map((project) => (
            <div className="mt-[30px]">
              
              <Link to={from != "client"?"/projects/actions/" + project.id+ "/"+ project.name:"/client/document/"+project.id}>
            
                <div
                  style={{
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                  className="flex min-h-[150px] cursor-pointer"
                >
                  <div
                    className={`w-[20%]  mr-[10px] `}
                    style={{
                      background: `url(https://api.tibilon.skillzserver.com/public${project.image})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="w-1/2">
                    <div className="flex flex-col justify-start gap-3">
                      <div className="flex align-end gap-2">
                        <div className="font-bold text-[16px]">
                          Project Name:
                        </div>{" "}
                        <span className="font-light text-[15px]">
                          {project.name}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <div className="font-bold text-[16px]">
                          Project Manager:
                        </div>{" "}
                        <span className="font-light text-[15px]">
                          {project.manager}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <div className="font-bold text-[16px]">
                          Site Location:
                        </div>{" "}
                        <span className="font-light text-[15px]">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-col items-between justify-between gap-3">
                      <div className="flex gap-2">
                        <div className="font-bold text-[16px]">
                          Project Owner:
                        </div>{" "}
                        <span className="font-light text-[15px]">
                          {project.owner}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <div className="font-bold text-[16px]">
                          Actual Start Date:
                        </div>{" "}
                        <span className="font-light text-[15px]">
                          {project.startDate}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <div className="font-bold text-[16px]">
                          Project Finish:
                        </div>{" "}
                        <span className="font-light text-[15px]">
                          {project.endDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        : null}
        </InfiniteScroll>
    </div>
  );
}
