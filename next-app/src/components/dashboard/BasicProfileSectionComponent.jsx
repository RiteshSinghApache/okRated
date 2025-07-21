import React, { useRef, useState, useEffect } from "react";
import QRCodeComponent from "./QRCodeComponent";
import SubscriptionPlanComponent from "./SubscriptionPlanComponent";
import SummaryComponent from "./SummaryComponent";
import ChartComponent from "./ChartComponent";
import ReportComponent from "./ReportComponent";

export default function BasicProfileSectionComponent({profile}) {
    const [preview, setPreview] = useState(profile.business_logo || "/assets/img/logo-preview.svg");
    // console.log("Rendering BasicProfileSectionComponent with profile:", profile);

  return (
    <>
        <div className="col-md-5">
            <div className="light-gb-gray">
                <div className="clearfix">
                    <div className="img-float-size">
                        <img
                            src={preview}
                            className="px-3 py-3 float-start me-3"
                            alt="logo"
                            onError={() => setPreview("/assets/img/logo-preview.svg")}
                        />
                        <div className="inner-box">
                            <h5
                                className="card-title">{profile.business_name || "N/A"}</h5>
                            <p
                                className="dark-gray-16-400">{profile.business_type || "N/A"}</p>
                        </div>
                    </div>
                </div>
                <div
                    className="start-0 w-100  border-bottom-gray">
                    <p
                        className="mb-0 dark-black-14-500">Email</p>
                    <p>{profile.email}</p>
                    <p
                        className="mb-0 dark-black-14-500">Phone
                        Number</p>
                    <p className="mb-0">{profile.phone}</p>
                </div>
                <QRCodeComponent profile={profile}/>
                <SubscriptionPlanComponent profile={profile} />
            </div>
        </div>
        <div className="col-md-7">
            <div className="row">
                <div className="col-md-12">
                    <div className="summary-box-inner">
                        <SummaryComponent profile={profile}/>
                        <ChartComponent profile={profile} />
                    </div>
                </div>
            </div>
            <ReportComponent profile={profile}/>
        </div>
    </>
    );
}
