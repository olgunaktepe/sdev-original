"use client"
import {Fragment} from "react";
import {ProgressBar} from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";
// types
import {SessionSummaryType} from "./data";

// components
const UsaVectorMap = dynamic(() => import("@/components/VectorMap/UsaVectorMap"), {ssr: false});

interface SessionOverviewProps {
    sessionSummary: SessionSummaryType[];
}

const SessionOverview = ({sessionSummary}: SessionOverviewProps) => {
    return (
        <div className="card">
            <div className="card-body">
                <ul className="nav float-end d-none d-lg-flex">
                    <li className="nav-item">
                        <Link className="nav-link text-muted" href="">
                            Today
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-muted" href="">
                            7d
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" href="">
                            15d
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-muted" href="">
                            1m
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-muted" href="">
                            1y
                        </Link>
                    </li>
                </ul>

                <h4 className="header-title mb-3">Sessions Overview</h4>

                <div className="row align-items-center">
                    <div className="col-xl-8">
                        <UsaVectorMap
                            height="363px"
                            width="100%"
                            options={{
                                zoomOnScroll: false,
                                backgroundColor: "transparent",
                                regionStyle: {
                                    initial: {
                                        fill: "#3bafda",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className="col-xl-4">
                        {sessionSummary.length > 0 &&
                            sessionSummary.map((session, index) => {
                                return (
                                    <Fragment key={index}>
                                        <h5 className="mb-1 mt-0">
                                            {session.stats}{" "}
                                            <small className="text-muted ms-2">
                                                {session.website}
                                            </small>
                                        </h5>
                                        <div className="row align-items-center g-0 mb-2 pb-1">
                                            <div className="col">
                                                <ProgressBar
                                                    variant={session.progressVariant}
                                                    now={session.progressValue}
                                                    className="progress-sm"
                                                />
                                            </div>
                                            <div className="col">
                                                <div className="fw-medium ms-2">
                                                    {session.progressValue}%
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionOverview;
