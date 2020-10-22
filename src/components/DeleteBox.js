import React from 'react';

class DeleteBox extends React.Component {

    //render: presents user with dialog to confirm deletion
    //of round. Credit: https://getbootstrap.com/docs/4.0/components/modal/

    render() {
        return (
            <div className="modal" role="dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title">Confirm Account Deletion</p>
                        <button className="close-modal-button" onClick={this.props.toggleDeletion}>
                        &times;</button>
                    </div>
                    <div className="modal-body">
                        <h4>Are you sure that you want to delete this account?</h4>
                    <div className="modal-footer">
                        <button className="btn btn-primary"
                        onClick={this.props.deleteAccount}>
                        Yes, delete account</button>
                        <button className="btn btn-secondary"
                        onClick={this.props.toggleDeletion}>
                        No, do not delete account</button>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteBox;