import SideBarComponent from "../dashboard/SideBarComponent";
import BusinessProfileComponent from "./BusinessProfileComponent";

export default function MainComponent({ profile }) {
    console.log("Rendering MainComponent with profile:", profile);
    return (
        <div className="row">
            {/* Sidebar for large screens */}
            <SideBarComponent profile={profile} />
            <div className="col-sm-12 col-lg-9 col-12">
                <div className="row">
                    <div className="col-12">
                        <div className="row my-4">
                            <BusinessProfileComponent profile={profile} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
