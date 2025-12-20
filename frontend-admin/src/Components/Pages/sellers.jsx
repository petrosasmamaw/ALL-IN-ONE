import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSellers, updateSeller, deleteSeller } from "../Slice/sellersSlice";

const Sellers = () => {
	const dispatch = useDispatch();
	const sellers = useSelector((state) => state.sellers.sellers || []);
	const status = useSelector((state) => state.sellers.status);

	useEffect(() => {
		dispatch(fetchAllSellers());
	}, [dispatch]);

	const toggleStatus = (s) => {
		const newStatus = s.status === "active" ? "inactive" : "active";
		dispatch(
			updateSeller({
				id: s._id,
				sellerData: {
					name: s.name,
					userId: s.userId,
					phoneNo: s.phoneNo,
					category: s.category,
					status: newStatus,
				},
			})
		);
	};

	const handleDelete = (id) => {
		if (window.confirm("Delete this seller?")) {
			dispatch(deleteSeller(id));
		}
	};

	return (
		<div className="container">
			<div className="clients-card">
				<h2>Sellers</h2>

				{status === "loading" && <div className="nav-loading">Loading...</div>}

				<div className="table-wrap">
					<table className="clients-table">
						<thead>
							<tr>
								<th>Avatar</th>
								<th>Name</th>
								<th>Phone</th>
								<th>Category</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{sellers.length === 0 && (
								<tr>
									<td colSpan="6" style={{ textAlign: "center" }}>
										No sellers found
									</td>
								</tr>
							)}

							{sellers.map((s) => (
								<tr key={s._id}>
									<td>
										{s.image ? (
											<img src={s.image} alt={s.name} className="client-avatar" />
										) : (
											<div className="client-avatar placeholder">
												{s.name ? s.name.charAt(0).toUpperCase() : "?"}
											</div>
										)}
									</td>
									<td>{s.name}</td>
									<td>{s.phoneNo}</td>
									<td>{s.category}</td>
									<td>
										<button
											className={"status-btn " + (s.status === "active" ? "active" : "inactive")}
											onClick={() => toggleStatus(s)}
										>
											{s.status}
										</button>
									</td>
									<td>
										<button className="delete-btn" onClick={() => handleDelete(s._id)}>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Sellers;

