import SideBarComponent from "./SideBarComponent";
import BasicProfileSectionComponent from "./BasicProfileSectionComponent";

export default function MainComponent({ profile }) {
    //console.log("Rendering MainComponent with profile:", profile);
    return (
        <div className="row">
            {/* Sidebar for large screens */}
            <SideBarComponent profile={profile} />
            <div className="col-sm-12 col-lg-9 col-12">
                <div className="row">
                    <div className="col-12">
                        <div className="row my-4">
                            <BasicProfileSectionComponent profile={profile} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
