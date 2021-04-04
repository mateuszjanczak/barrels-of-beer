const AddForm = () => (
    <form>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Nazwa beczki</label>
            <input type="text" className="form-control" id="name" disabled/>
        </div>

        <div className="mb-3">
            <label htmlFor="beer" className="form-label">Rodzaj piwa</label>
            <input type="text" className="form-control" id="beer"/>
        </div>

        <div className="mb-3">
            <label htmlFor="capacity" className="form-label">Ilość piwa w [L]</label>
            <input type="number" className="form-control" id="capacity"/>
        </div>
        <button type="submit" className="btn btn-primary">Ustaw</button>
    </form>
);

export default AddForm;