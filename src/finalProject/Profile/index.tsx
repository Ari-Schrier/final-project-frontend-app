function Profile(){
    return(
        <>
        <div className="row">
            <div className="col-6">
                <div>
                    <label className="float-end h3" htmlFor="wdDisplaynameField">Display Name:</label>
                </div>
            </div>
            <div className="col-6">
                <div className="row">
                    <div className="col">
                        <input className="form-control" id="wdDisplaynameField" placeholder="Enter Display Name" />
                    </div>
                    <div className="col-3">
                        <button className="btn btn-primary">Save New Display Name</button>
                    </div>
                </div>
            </div>

        </div>
        </>
    );
}
export default Profile;