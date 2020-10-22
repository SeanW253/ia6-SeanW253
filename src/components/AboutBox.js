import React from 'react';

class AboutBox extends React.Component {

    //render: presents user with dialog to confirm deletion
    //of round. Credit: https://getbootstrap.com/docs/4.0/components/modal/

    render() {
        return (
            // <div className="modal" role="dialog">
            //     <div className="modal-content">
            //         <div className="modal-header">
            //             <p className="modal-title">Confirm Round Deletion</p>
            //             <button className="close-modal-button" onClick={this.props.hideAboutBox}>
            //             &times;</button>
            //         </div>
            //         <div className="modal-body">
            //             <h4>Are you sure that you want to delete this round?</h4>
            //         <div className="modal-footer">
            //             <button className="btn btn-primary"
            //             onClick={this.props.hideAboutBox}>
            //             Yes, delete round</button>
            //             <button className="btn btn-secondary"
            //             onClick={this.props.hideAboutBox}>
            //             No, do not delete round</button>
            //         </div>
            //         </div>
            //     </div>
            // </div>


            <div id="aboutModal" className="modal" role="dialog">
            <div className="modal-content" >
                <div className="modal-header">
                <center>
                    <h3 className="modal-title">About SpeedScore
                    <button id="modalClose" className="close"
                        onClick={this.props.hideAboutBox} >
                        &times;</button>
                    </h3>
                </center>
                
                </div>
                <div className="modal-body">
                <center>
                <p>SpeedScore apps support</p>
                <img src="https://dl.dropboxusercontent.com/s/awuwr1vpuw1lkyl/SpeedScore4SplashLogo.png"
                height="200" width="200" />
                </center>
                <p>SpeedScore apps support</p>
                <ul>
                <li>live touranment scoring (<i>SpeedScore Live&reg;</i>)</li>
                <li>tracking personal speedgolf rounds and sharing results
                (<i>SpeedScore Track&reg;</i>)</li>
                <li>finding speedgolf-friendly courses, booking tee times, and
                paying to play speedgolf by the minute (<i>SpeedScore
                Play&reg;</i>)</li>
                </ul>
                </div>
                <div className="modal-footer">
                    <button id="aboutOK" className="close" onClick={this.props.hideAboutBox}>
                    OK</button>
                </div>
            </div>
            </div>

        );
    }
}

export default AboutBox;