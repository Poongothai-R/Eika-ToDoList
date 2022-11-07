
function Header(){
return(
    <div className="header">
        <img className="header-logo" src="/img/logo1.png" />
        <form>
            <input type="text" class="search-input" placeholder="Search..."/>
            <button><i className="fas fa-search search-icon"></i></button>
        </form>
        <div className="nav">
            <ul className="nav-list">
                <li className="nav-item">
                    <i className="fas fa-user nav-icon">
                    </i>
                </li>
            </ul>
    </div>
    </div>
);
}export default Header;