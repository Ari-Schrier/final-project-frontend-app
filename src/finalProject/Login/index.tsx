function Login(){
    return(
        <div className="row">
            <div className="col-0 col-md-1 col-lg-3"></div>
            <div className="col-12 col-md-10 col-lg-6">
                <div className="row">
                    <h1>Welcome to TradTrove!</h1>
                </div>
                <div className="row">
                    <h2>Log in to get started!</h2>
                </div>
                <div className="row">
                    <div className="col-2" />
                    <div className="col-4" />
                    <div className="form-group">
                        <label htmlFor="wdUsernameField">Username</label>
                        <input className="form-control" id="wdUsernameField" placeholder="Enter Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="wdPasswordField">Password</label>
                        <input type="password" className="form-control" id="wdPasswordField" placeholder="Enter Password" />
                        <small className="form-text text-muted">Remember not to share your password with anyone</small>
                    </div>
                    <div className="col-12 col-lg-10">
                        <button className="btn btn-primary btn-lg m-2">Login</button>
                        <button className="btn btn-secondary btn-lg m-2">Register as...</button>
                        <select className="form-select-lg m-2 pt-1">
                            <option value="wdDefaultUser" selected>Default User</option>
                            <option value="wdAdmin">Admin</option>
                            <option value="wdWarned">Warned User</option>
                        </select>
                    </div>
                    <div className="col-4" />
                </div>
            </div>
            <div className="col-0 col-md-1 col-lg-3"></div>
        </div>
    );
}
export default Login;