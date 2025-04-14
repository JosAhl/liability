import '@/styles/components/dashboard-search.css'

const DashboardSearch = () => {
    return (
        <form role="search" aria-label="Search profiles" className="search-form">
            <label htmlFor="search-input" className="visually-hidden">
                Sök
            </label>
            <div className="search-wrapper">
                <span className="search-icon" aria-hidden="true"><img src="/icon/magnifying-icons.png" alt="" /></span>
                <input
                type="search"
                id="search-input"
                name="query"
                placeholder="Sök"
                className="search-input"
                />
            </div>
        </form>
    );
}
export default DashboardSearch;