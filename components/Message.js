export default function Message({ query, onPress, onDelete }) {
  return (
    <div className="card shadow-sm hover:shadow-xl w-4/5 bg-slate-50 hover:scale-105 transition-all" onClick={onPress}>
      <div className="flex absolute justify-end w-full self-center">
          <button className="btn btn-outline btn-error" onClick={onDelete}>Delete</button>
        </div>
      <div className="card-body">
        <h2 className="card-title">{query.name}</h2>
        <h3 className="text-lg font-medium">{query.email}</h3>
        <p className="bg-slate-100">{query.enquiry}</p>
      </div>
    </div>
  )
}