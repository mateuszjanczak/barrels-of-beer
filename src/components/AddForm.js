const AddForm = () => (
    <form>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Nazwa beczki</label>
            <input type="text" className="form-control" id="name"/>
        </div>
        <div className="mb-3">
            <label htmlFor="capacity" className="form-label">Pojemność [L]</label>
            <input type="number" className="form-control" id="capacity"/>
        </div>
        <button type="submit" className="btn btn-primary">Dodaj beczkę</button>
    </form>
);

export default AddForm;